const bcrypt = require("../libs/brcypt");
const jwt = require("../libs/jwt");
const redisClient = require("../database/redis");

const adminHandler = require("../services/adminHandler");
const adminValidators = require("../validators/adminValidators");
const adminUtilities = require("../utilities/adminUtilities");
const libHandler = require("../services/libHandler");

const CONSTANTS = require("../properties/constants");

module.exports.generateUsernames = async (req, res, next) => {
  try {
    const response = await adminHandler.getBranchNames();
    const {
      data: { result: branchData },
    } = response;

    const branches = branchData.map((branch) => {
      branch.branch_name = branch.branch_name
        .toLowerCase()
        .replace("'", "")
        .split(" ")
        .join("");
      return [branch.branch_name, branch.branch_id];
    });

    // console.log(branches);
    await adminHandler.pushBranchNames(branches);
    res.status(CONSTANTS.responseFlags.USERNAMES_GENERATED).json(response);
  } catch (err) {
    res.status(CONSTANTS.responseFlags.CANNOT_GENERATE_USERNAMES).json(err);
  }
};

module.exports.generatePasswords = async (req, res, next) => {
  try {
    const {
      locals: { hash },
    } = res;

    const response = await adminHandler.pushPasswords(hash);
    res.status(CONSTANTS.responseFlags.PASSWORD_GENERATED).json(response);
  } catch (err) {
    res.status(CONSTANTS.responseFlags.UNABLE_TO_GENERATE_PASSWORD).json(err);
  }
};

module.exports.registerAdmin = async (req, res, next) => {
  try {
    const admin = {
      admin_name: req.body.admin_name,
      admin_email: req.body.admin_email,
      admin_password: req.body.admin_password,
    };

    // validate inputs
    await adminValidators.validateAdminRegister(admin);

    // check if admin_email already exists
    const isAdminRegistered = await adminHandler.isAdminRegistered({
      admin_email: admin.admin_email,
    });

    if (isAdminRegistered) {
      res.status(CONSTANTS.responseFlags.ACTION_INCOMPLETE).json(
        adminUtilities.adminAlreadyRegistered({
          admin_email: admin.admin_email,
        })
      );
    } else {
      // encrypt the password and push admin details
      const hashedPassword = await bcrypt.hashPassword({
        password: admin.admin_password,
      });
      admin.admin_password = hashedPassword;
      const adminSaved = await adminHandler.saveAdminDetails(admin);
      console.log(adminSaved);
      res.status(CONSTANTS.responseFlags.ACTION_COMPLETE).json(adminSaved);
    }
  } catch (err) {
    res.status(CONSTANTS.responseFlags.ACTION_INCOMPLETE).json(err);
  }
};

module.exports.adminLogin = async (req, res, next) => {
  try {
    const admin = {
      admin_email: req.body.admin_email,
      admin_password: req.body.admin_password,
    };

    await adminValidators.validateAdminLogin(admin);
    // check if admin has been registered or not
    const adminId = await adminHandler.getAdminId({
      admin_email: admin.admin_email,
    });
    console.log({ adminId });

    // get password hash
    const passwordHash = await adminHandler.getPasswordHash({
      table: "admins",
      selectColumn: "admin_password",
      filterColumn: "admin_id",
      filterColumnValue: adminId,
    });
    console.log({ passwordHash });

    // check if password is correct
    const isPasswordCorrect = await bcrypt.matchPassword({
      passwordEntered: admin.admin_password,
      passwordHash,
    });
    console.log({ isPasswordCorrect });

    if (!isPasswordCorrect) {
      res
        .status(CONSTANTS.responseFlags.INCORRECT_PASSWORD)
        .json(adminUtilities.incorrectPassword(admin));
    } else {
      const tokenPayload = { id: adminId };
      // create an access token
      const accessToken = jwt.createAccessToken(tokenPayload);
      // create a refresh token so as to refresh the access token after it expires
      const refreshToken = jwt.createRefreshToken(tokenPayload);
      // save the refresh token as values in redis cache with key as adminId
      redisClient.setex(adminId, 3600, refreshToken);

      // send the accessToken and refreshToken to the client
      const payload = { accessToken, refreshToken };
      console.log({ payloadSentToClient: payload });

      // create a session
      req.session.user = {
        adminId,
        admin_email: admin.admin_email,
      };
      console.log({ sessionCreated: req.session.user });

      res.status(CONSTANTS.responseFlags.ADMIN_LOGIN).json(
        adminUtilities.adminLoginSuccessful({
          adminId,
          ...payload,
        })
      );
    }
  } catch (err) {
    res.status(CONSTANTS.responseFlags.ADMIN_NOT_LOGGED_IN).json(err);
  }
};

module.exports.adminSessionLogin = (req, res, next) => {
  // check if session exists in the request object
  console.log({ activeSession: req.session });
  if (req.session.user) {
    console.log("User Session found.");
    res.json({
      loggedIn: true,
      user: req.session.user,
    });
  } else {
    console.log("User session not present");
    res.json({
      loggedIn: false,
    });
  }
};

module.exports.adminLogout = async (req, res, next) => {
  try {
    const { id } = req.payload;
    if (!id) {
      return res.status(CONSTANTS.responseFlags.ACTION_INCOMPLETE).json(
        libUtilities.accessTokenMissing({
          error: "Admin id not found.",
        })
      );
    } else {
      // destroy admin session
      req.session.destroy();
      console.log({ reqSession: req.session });
      // remove the refresh token from redis
      redisClient.del(id, (err, value) => {
        if (err) console.log(err);
        console.log(value);
        res.sendStatus(CONSTANTS.responseFlags.LOGOUT_SUCCESSFUL);
      });
    }
  } catch (err) {
    res.status(CONSTANTS.responseFlags.ACTION_INCOMPLETE).json(err);
  }
};

module.exports.displayDashboard = async (req, res, next) => {
  try {
    // get data related to all branches from 'branches' table in db
    const branchesFromDb = await adminHandler.getBranchData();
    console.log({ branchesFromDb });
    const { data: responseArray } = branchesFromDb;
    // create an array that contains all information related to foreign keys
    // in database so as to extract data from other tables
    let mappingIds = [];
    responseArray.map((branchData) => {
      mappingIds.push({
        branch_id: branchData.branch_id,
        institute_id: branchData.institution_id,
        city_id: branchData.city_id,
      });
    });

    // fetch all additional information like contact_numbers pin_codes
    // from respective tables
    const { data: fetchedBranchInfo } = await adminHandler.fetchBranchInfo(
      mappingIds
    );
    // console.log({ fetchedBranchInfo });

    responseArray.map((branchInfo) => {
      // extract institute_name, city_name, contacts and pin_codes from fetchedBranchInfo
      branchInfo.institute_name = fetchedBranchInfo[0][0].institute_name;
      branchInfo.city_name = fetchedBranchInfo[1][0].city_name;

      // 'contacts' is an array so we use array.reduce to filter
      // and push the contact number to the 'contacts' array
      branchInfo.contacts = fetchedBranchInfo[2].reduce(
        (accumulator, contactObj) => {
          if (contactObj.branch_id === branchInfo.branch_id) {
            accumulator.push(contactObj.contact_number);
          }
          return accumulator;
        },
        []
      );

      // 'pin_codes' is an array so we use array.reduce to filter
      // and push the pin code to the 'pin_codes' array
      branchInfo.pin_codes = fetchedBranchInfo[3].reduce(
        (accumulator, pinCodeObj) => {
          if (pinCodeObj.serving_branch_id === branchInfo.branch_id) {
            accumulator.push(pinCodeObj.pin_code);
          }
          return accumulator;
        },
        []
      );
    });

    console.log({ responseArray });
    res
      .status(CONSTANTS.responseFlags.RECEIVED_BRANCH_DATA)
      .json(responseArray);
  } catch (err) {
    res.status(CONSTANTS.responseFlags.CANNOT_GET_BRANCH_DATA).json(err);
  }
};

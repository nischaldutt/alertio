const adminHandler = require("../services/adminHandler");
const adminValidators = require("../validators/adminValidators");
const adminUtilities = require("../utilities/adminUtilities");
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

module.exports.adminLogin = async (req, res, next) => {
  try {
    const admin = {
      admin_name: req.body.params.admin_name,
      branch_username: req.body.params.branch_username,
      branch_password: req.body.params.branch_password,
    };
    // console.log(admin);
    await adminValidators.validateAdminLogin(admin);
    // check if admin has been registered or not
    const isAdminRegistered = await adminHandler.isAdminRegistered(
      admin.admin_name
    );

    // check if branch_username entered is correct or not
    await adminHandler.isUsernameCorrect(admin.branch_username);

    if (!isAdminRegistered.error) {
      const { password: passwordHash } = await adminHandler.getPasswordHash(
        admin.branch_username
      );

      // use bcrypt to match password hash with entered branch_password
      const isPasswordCorrect = await adminHandler.checkIfPasswordCorrect(
        admin.branch_password,
        passwordHash
      );

      isPasswordCorrect
        ? next()
        : res
            .status(CONSTANTS.responseFlags.INCORRECT_PASSWORD)
            .json(adminUtilities.incorrectPassword(admin));
    }
  } catch (err) {
    res.status(CONSTANTS.responseFlags.ADMIN_NOT_LOGGED_IN).json(err);
  }
};

module.exports.displayDashboard = async (req, res, next) => {
  try {
    // get data related to all branches from 'branches' table in db
    const branchesFromDb = await adminHandler.getBranchData();

    const {
      data: { branches: responseArray },
    } = branchesFromDb;
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

    // console.log(responseArray);

    // fetch all additional information like contact_numbers pin_codes
    // from respective tables
    const {
      data: { result: fetchedBranchInfo },
    } = await adminHandler.fetchBranchInfo(mappingIds);
    // console.log(fetchedBranchInfo);

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

    res
      .status(CONSTANTS.responseFlags.RECEIVED_BRANCH_DATA)
      .json(responseArray);
  } catch (err) {
    res.status(CONSTANTS.responseFlags.CANNOT_GET_BRANCH_DATA).json(err);
  }
};

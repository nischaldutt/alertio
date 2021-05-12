const createError = require("http-errors");

const bcrypt = require("../libs/brcypt");
const jwt = require("../libs/jwt");
const redisClient = require("../database/redis");

const adminHandler = require("../services/adminHandler");
const branchValidators = require("../validators/branchValidators");
const adminUtilities = require("../utilities/adminUtilities");
const libHandler = require("../services/libHandler");

const CONSTANTS = require("../properties/constants");

module.exports.branchLogin = async (req, res, next) => {
  try {
    const branch = {
      branch_username: req.body.branch_username,
      branch_password: req.body.branch_password,
    };

    await branchValidators.validateBranchLogin(branch);
    // get branchId corresponding to the branch_username
    const { branch_id: branchId } = await adminHandler.getBranchId({
      username: branch.branch_username,
    });
    console.log({ branchId });

    // get password hash
    const passwordHash = await adminHandler.getPasswordHash({
      table: "branches",
      selectColumn: "password",
      filterColumn: "branch_id",
      filterColumnValue: branchId,
    });
    console.log({ passwordHash });

    // check  if password is correct
    const isPasswordCorrect = await bcrypt.matchPassword({
      passwordEntered: branch.branch_password,
      passwordHash,
    });
    console.log({ isPasswordCorrect });

    if (!isPasswordCorrect) {
      res
        .status(CONSTANTS.responseFlags.INCORRECT_PASSWORD)
        .json(createError(400, "Branch password is incorrect"));
    } else {
      // // extract access token from the headers and set headers to next request in redirect
      // const authHeader = req.headers["authorization"];
      // const accessToken = authHeader && authHeader.split(" ")[1];

      // res.header("Authorization", `Bearer ${accessToken}`);
      // res.redirect("/admin/dashboard");

      res.status(CONSTANTS.responseFlags.ACTION_COMPLETE).json({
        branch: branch.branch_username,
        message: "Branch login successful.",
      });
    }
  } catch (err) {
    res.status(CONSTANTS.responseFlags.ADMIN_NOT_LOGGED_IN).json(err);
  }
};

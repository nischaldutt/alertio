const CONSTANTS = require("../properties/constants");

module.exports.userNamesGenerated = (result) => {
  return {
    data: result,
    status: CONSTANTS.responseFlags.USERNAMES_GENERATED,
    message: "Usernames generated.",
  };
};

module.exports.userNamesNotGenerated = (err) => {
  return {
    error: err,
    status: CONSTANTS.responseFlags.CANNOT_GENERATE_USERNAMES,
    message: "Usernames not generated.",
  };
};

module.exports.passwordsGenerated = (result) => {
  return {
    data: result,
    status: CONSTANTS.responseFlags.USERNAMES_GENERATED,
    message: "Passwords generated.",
  };
};

module.exports.passwordsNotGenerated = (err) => {
  return {
    error: err,
    status: CONSTANTS.responseFlags.CANNOT_GENERATE_USERNAMES,
    message: "Passwords not generated.",
  };
};

module.exports.adminNotRegistered = ({ admin_email }) => {
  return {
    error: admin_email,
    status: CONSTANTS.responseFlags.ACTION_INCOMPLETE,
    message: "Admin is not registered.",
  };
};

module.exports.adminAlreadyRegistered = (result) => {
  return {
    error: result,
    status: CONSTANTS.responseFlags.ACTION_INCOMPLETE,
    message: "Admin already registered.",
  };
};

module.exports.adminRegistered = ({ admin_name }) => {
  return {
    data: admin_name,
    status: CONSTANTS.responseFlags.ACTION_COMPLETE,
    message: "Admin successfully registered.",
  };
};

module.exports.adminLoginSuccessful = (payload) => {
  return {
    data: payload,
    status: CONSTANTS.responseFlags.ACTION_COMPLETE,
    message: "Admin successfully logged in.",
  };
};

module.exports.passwordMatched = (result) => {
  return {
    data: result,
    status: CONSTANTS.responseFlags.PASSWORD_MATCHED,
    message: "Passwords matched.",
  };
};

module.exports.incorrectPassword = (err) => {
  return {
    error: {
      description: err,
      message: "Incorrect password.",
    },
    status: CONSTANTS.responseFlags.INCORRECT_PASSWORD,
    message: "Please enter correct password.",
  };
};

module.exports.loginSuccessful = (admin) => {
  return {
    data: admin,
    status: CONSTANTS.responseFlags.ADMIN_LOGIN,
    message: "Admin logged in successfully.",
  };
};

module.exports.usernameValid = (username) => {
  return {
    data: username,
    status: CONSTANTS.responseFlags.USERNAME_CORRECT,
    message: "Username valid.",
  };
};

module.exports.usernameInvalid = (username) => {
  return {
    error: username,
    status: CONSTANTS.responseFlags.USERNAME_INCORRECT,
    message: "Incorrect username",
  };
};

module.exports.receivedBranches = (branches) => {
  return {
    data: branches,
    status: CONSTANTS.responseFlags.RECEIVED_BRANCH_DATA,
    message: "Branch data received.",
  };
};

module.exports.branchesNotReceived = (err) => {
  return {
    error: err,
    status: CONSTANTS.responseFlags.CANNOT_GET_BRANCH_DATA,
    message: "Branch data not received.",
  };
};

module.exports.issueWhileFetchingBranchInfo = (err) => {
  return {
    error: err,
    status: CONSTANTS.responseFlags.CANNOT_GET_BRANCH_DATA,
    message: "Branch info not received.",
  };
};

module.exports.branchInfoReceived = (result) => {
  return {
    data: result,
    status: CONSTANTS.responseFlags.RECEIVED_BRANCH_DATA,
    message: "Branch info received.",
  };
};

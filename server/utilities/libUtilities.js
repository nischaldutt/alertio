const CONSTANTS = require("../properties/constants");

module.exports.accessTokenMissing = (error) => {
  return {
    error: error,
    status: CONSTANTS.responseFlags.UNAUTHORIZED_REQUEST,
    message: "Unauthorized request",
  };
};

module.exports.accessTokenExpired = (error) => {
  return {
    error: error,
    status: CONSTANTS.responseFlags.ACCESS_FORBIDDEN,
    message: "JWT_TOKEN_EXPIRED",
  };
};

module.exports.refreshTokenMissing = (error) => {
  return {
    error: error,
    status: CONSTANTS.responseFlags.ACCESS_FORBIDDEN,
    message: "Action forbidden",
  };
};

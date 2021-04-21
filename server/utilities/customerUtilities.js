const CONSTANTS = require("../properties/constants");

module.exports.actionComplete = (result) => {
  return {
    data: result,
    status: CONSTANTS.responseFlags.ACTION_COMPLETE,
    message: "Action Completed.",
  };
};

module.exports.actionInComplete = (error) => {
  return {
    error: error,
    status: CONSTANTS.responseFlags.ACTION_INCOMPLETE,
    message: "Action Incomplete.",
  };
};

const joi = require("joi");
const createError = require("http-errors");

const CONSTANTS = require("../properties/constants");

const validObject = (result) => {
  return {
    data: {
      message: result,
    },
    status: CONSTANTS.responseFlags.VALIDATION_SUCCESS,
    message: "Validated!",
  };
};

module.exports.validateBranchLogin = (branch) => {
  const schema = joi.object().keys({
    branch_username: joi.string().required(),
    branch_password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

  return new Promise((resolve, reject) => {
    const validationResult = schema.validate(branch);
    validationResult.error
      ? reject(createError(400, validationResult.error.details[0].message))
      : resolve(validObject("Input Validated"));
  });
};

const joi = require("joi");

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

const invalidObject = (err) => {
  return {
    data: {
      error: err.details[0].message,
    },
    status: CONSTANTS.responseFlags.INVALID_INPUT,
    message: "Validation error.",
  };
};

module.exports.validateAdminLogin = (admin) => {
  const schema = joi.object().keys({
    admin_name: joi.string().required(),
    branch_username: joi.string().alphanum().min(3).max(30).required(),
    branch_password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

  return new Promise((resolve, reject) => {
    const validationResult = schema.validate(admin);
    validationResult.error
      ? reject(invalidObject(validationResult.error))
      : resolve(validObject("Input Validated"));
  });
};

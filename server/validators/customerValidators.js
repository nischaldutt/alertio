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

module.exports.validateCustomerLogin = (admin) => {
  const schema = joi.object().keys({
    customer_username: joi.string().required(),
    pin_code: joi.string().min(4).max(8).required(),
  });

  return new Promise((resolve, reject) => {
    const validationResult = schema.validate(admin);
    validationResult.error
      ? reject(invalidObject(validationResult.error))
      : resolve(validObject("Input Validated"));
  });
};

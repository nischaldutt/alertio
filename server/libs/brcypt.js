const Promise = require("bluebird");

const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.hashPassword = async ({ password }) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  // res.locals.hash = hash;
  return hash;
};

exports.matchPassword = ({ passwordEntered, passwordHash }) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(passwordEntered, passwordHash, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

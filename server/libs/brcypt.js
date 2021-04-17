const bcrypt = require("bcrypt");

const saltRounds = 10;
const password = "password";

exports.hashPassword = async (req, res, next) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  res.locals.hash = hash;
  next();
};

exports.matchPassword = (passwordEntered, hashPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(passwordEntered, hashPassword, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

const jwt = require("jsonwebtoken");

const privateKey = process.env.JWT_PRIVATE_KEY;

module.exports.createToken = (payload) => {
  const token = jwt.sign(payload, privateKey, { expiresIn: "1h" });
  return token;
};

module.exports.verifyToken = () => {};

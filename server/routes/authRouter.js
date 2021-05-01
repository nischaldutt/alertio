const router = require("express").Router();

const jwt = require("../libs/jwt");

module.exports = router;

// generate new access token using refresh token
router.post("/token", jwt.verifyRefreshToken);

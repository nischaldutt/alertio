const router = require("express").Router();

const jwt = require("../libs/jwt");

module.exports = router;

router.post("/token", jwt.verifyRefreshToken);

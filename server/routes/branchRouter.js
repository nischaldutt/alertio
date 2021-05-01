const router = require("express").Router();

const jwt = require("../libs/jwt");
const branchController = require("../controller/branchController");

module.exports = router;

router.post("/login", jwt.verifyAccessToken, branchController.branchLogin);

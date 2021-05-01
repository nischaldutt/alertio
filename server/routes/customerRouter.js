const router = require("express").Router();

const customerController = require("../controller/customerController");

module.exports = router;

// get all serving branches at entered pin codes
router.get("/get_branch_info", customerController.getBranchInfo);

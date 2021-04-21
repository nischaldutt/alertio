const router = require("express").Router();

const customerController = require("../controller/customerController");

module.exports = router;

// GET BRANCH INFO
router.post("/get_branch_info", customerController.getBranchInfo);

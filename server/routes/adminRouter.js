const router = require("express").Router();

const adminController = require("../controller/adminController");
const bcrypt = require("../libs/brcypt");

module.exports = router;

// GENERATE USERNAMES
router.post("/generate_usernames", adminController.generateUsernames);

// GENERATE PASSWORDS
router.post(
  "/generate_passwords",
  bcrypt.hashPassword,
  adminController.generatePasswords
);

// NEW ADMIN REGISTER
router.post("/register", adminController.registerAdmin);

// ADMIN LOGIN
router.post(
  "/login",
  adminController.adminLogin,
  adminController.displayDashboard
);

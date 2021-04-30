const router = require("express").Router();

const adminController = require("../controller/adminController");
const bcrypt = require("../libs/brcypt");
const jwt = require("../libs/jwt");

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
router.post("/login", adminController.adminLogin);

// ADMIN LOGOUT
router.post("/logout", jwt.verifyAccessToken, adminController.adminLogout);

// ADMIN DASHBOARD
router.get(
  "/dashboard",
  jwt.verifyAccessToken,
  adminController.displayDashboard
);

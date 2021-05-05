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

// new admin register
router.post("/register", adminController.registerAdmin);

// admin login
router.post("/login", adminController.adminLogin);

// admin login check
router.get("/login", adminController.adminSessionLogin);

// admin logout
router.post("/logout", jwt.verifyAccessToken, adminController.adminLogout);

// ADMIN DASHBOARD
router.get(
  "/dashboard",
  jwt.verifyAccessToken,
  adminController.displayDashboard
);

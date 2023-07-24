const express = require("express");
const registerController = require("../../../controllers/auth/registerController");
const loginController = require("../../../controllers/auth/loginController");
const verifyOTP = require("../../../controllers/auth/verifyOTP");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/verifyemail", verifyOTP);

module.exports = router;

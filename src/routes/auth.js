const express = require("express");
const router = express.Router();

const authController = require("../app/controllers/AuthController");
const { uploadImage } = require("../app/middlewares/upload");

router.get("/login", authController.login);
router.get("/login/email", authController.loginEmail);
router.post("/login/verify", authController.loginVerify); // Lưu thông tin user vào session
router.get("/register", authController.register);
router.get("/register/email", authController.registerEmail);
router.post("/register/email/store", authController.registerEmailStore);
router.post("/register/google/store", authController.registerGoogleStore);
router.get("/logout", authController.logout);

module.exports = router;

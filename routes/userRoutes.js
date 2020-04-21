const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.patch("/me", userController.getCurrentUser, userController.updateUser);
router.patch(
  "/password",
  userController.getCurrentUser,
  userController.updatePassword
);
router.post("/forgotPassword", userController.forgotPassword);
router.patch("/resetPassword", userController.resetPassword);

module.exports = router;

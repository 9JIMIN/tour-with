const express = require("express");
const viewController = require("../controllers/viewController");
const userController = require("../controllers/userController");
const tourController = require("../controllers/tourController");

const router = express.Router();

router.get(
  "/",
  userController.getCurrentUser,
  tourController.getAllTours,
  userController.getGuideStats,
  viewController.getOverview
);
router.get("/join", viewController.getSignupForm);
router.get("/login", viewController.getLoginForm);
router.get(
  "/updateUser",
  userController.getCurrentUser,
  viewController.getUpdateUserForm
);
router.get(
  "/new",
  userController.getCurrentUser,
  viewController.getCreateTourForm
);
router.get(
  "/my-tours",
  userController.getCurrentUser,
  viewController.getMyTours
);
router.get("/forgotPassword", viewController.getForgotPasswordForm);
router.get(
  "/resetPassword/:token",
  userController.checkToken,
  viewController.getresetPasswordForm
);
router.get("/:user", userController.getCurrentUser, viewController.getAccount);
router.get(
  "/tour/:slug",
  userController.getCurrentUser,
  viewController.getTour
);
// is logged in 검사하는거 url에 누르면 들어올수있는거 방지할라고 그렇다기에 에러가 없지 그냥 user를 쓰기위해서그럼
module.exports = router;

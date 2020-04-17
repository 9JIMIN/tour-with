const express = require("express");
const viewController = require("../controllers/viewController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.isLoggedIn, viewController.getOverview);
router.get("/signup", viewController.getSignupForm);
router.get("/login", viewController.getLoginForm);
router.get("/me", viewController.getAccount);

module.exports = router;

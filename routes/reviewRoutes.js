const express = require("express");
const reviewController = require("../controllers/reviewController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post(
  "/",
  userController.getCurrentUser,
  reviewController.setTourUserId,
  reviewController.createReview
);

module.exports = router;

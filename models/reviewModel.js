const mongoose = require("mongoose");
const Tour = require("./tourModel");
const User = require("./userModel");

const reviewSchema = new mongoose.Schema({
  tourRating: { type: Number, min: 1, max: 5 },
  tourReview: String,
  guideRating: { type: Number, min: 1, max: 5 },
  guideReview: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  guide: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
  },
});

//reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.statics.calcAverageRatings = async function (tourId, guideId) {
  const tourStats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$tourRating" },
      },
    },
  ]);

  const guideStats = await this.aggregate([
    {
      $match: { guide: guideId },
    },
    {
      $group: {
        _id: "$guide",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$guideRating" },
      },
    },
  ]);

  if (tourStats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: tourStats[0].avgRating,
      ratingsQuantity: tourStats[0].nRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    });
  }

  if (guideStats.length > 0) {
    await User.findByIdAndUpdate(guideId, {
      ratingsAverage: guideStats[0].avgRating,
      ratingsQuantity: guideStats[0].nRating,
    });
  } else {
    await User.findByIdAndUpdate(guideId, {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.tour, this.guide);
});

// reviewSchema.post(/^find/, async function (doc) {
//   await doc.constructor.calcAverageRatings(doc.tour, doc.guide);
// });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

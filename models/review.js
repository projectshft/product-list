const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userName: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: "Product" },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

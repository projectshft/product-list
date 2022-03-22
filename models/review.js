const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require('../models/review')

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Review", ReviewSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReviewSchema = require("../models/review.js")

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [mongoose.model("Review").schema],
});

module.exports = mongoose.model("Product", ProductSchema);
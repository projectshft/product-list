const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const ProductSchema = new Schema({
  category: String,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  reviews: [Review]
});

module.exports = mongoose.model("Product", ProductSchema);
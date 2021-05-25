const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

// const ReviewSchema = new Schema({
//   username: { type: String, required: true },
//   text: { type: String, required: true }
// })

const ProductSchema = new Schema({
  category: String,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  reviews: [Review]
});

module.exports = mongoose.model("Product", ProductSchema);
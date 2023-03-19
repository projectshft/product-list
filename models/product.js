const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
  userName: String,
  text: String,
})

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [reviewsSchema]
});

module.exports = mongoose.model("Product", ProductSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userName: String, 
  text: String,
  product: Number
})

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  review: [reviewSchema]
});

module.exports = mongoose.model("Product", ProductSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userName: String,
  text: String,
  product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});
const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

const Product = mongoose.model("Product", ProductSchema);
const Review = mongoose.model("Review", reviewSchema);

module.exports = { Product, Review };

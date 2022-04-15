const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
});

//Review schema
//each review needs:
  //userName
  //text
  //product (represented by id)

const reviewSchema = new Schema({
  userName: String,
  text: String,
  product: [ProductSchema]
});

const Review = mongoose.model("Review", reviewSchema);
const Product = mongoose.model("Product", ProductSchema);

module.exports = {Review, Product};
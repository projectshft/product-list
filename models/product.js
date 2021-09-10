const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "review" }]
});

const ReviewSchema = new Schema({
  text: String,
  user: String,
  product: {type:Schema.Types.ObjectId, ref:"Product"}
});

const Review = mongoose.model("review", ReviewSchema)
const Product = mongoose.model("Product", ProductSchema);

module.exports = {Product, Review}
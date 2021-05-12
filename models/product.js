const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userName: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: "product" },
});

const Review = mongoose.model("review", reviewSchema);

const productSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "review" }]
});

const Product = mongoose.model("product", productSchema);

module.exports = {
  Review,
  Product
};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review"}]
});

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: "Product" }
});

// const Review = mongoose.model("Review", ReviewSchema);
// const Product = mongoose.model("Product", ProductSchema);

// module.exports = {Review, Product};

module.exports = {
  Product: mongoose.model("Product", ProductSchema),
  Review: mongoose.model("Review", ReviewSchema)
} 


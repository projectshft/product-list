const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const ReviewSchema = new Schema({
  text: String,
  userName: String,
  product: { type: Schema.Types.ObjectId, ref: "Product" },
});

const Review = mongoose.model("Review", ReviewSchema);

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
});

module.exports = mongoose.model("Product", ProductSchema);
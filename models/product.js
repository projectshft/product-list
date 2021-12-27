const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userName: String,
  reviewText: String,
});

const Review = mongoose.model("review", ReviewSchema);

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [ReviewSchema],
});

ProductSchema.index({name: 'text'})

const Product = mongoose.model("product", ProductSchema);

module.exports = {
  Review: Review,
  Product: Product
}

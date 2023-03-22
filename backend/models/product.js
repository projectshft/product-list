const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: String,
  review: [{type: Schema.Types.ObjectId, ref: "Review"}]
});

const ReviewSchema = new Schema({
  review: String,
  name: [AuthorSchema],
  product: [{type: Schema.Types.ObjectId, ref: "Product" }]
});

const ProductSchema = new Schema({
  category: {
    type: String,
    required: [true]
  },
  name: {
    type: String,
    required: [true]
  },
  price: {
    type: Number,
    required: [true]
  },
  image: String,
  reviews: [ReviewSchema]
});

module.exports = {
  Review: mongoose.model("Review", ReviewSchema),
  Author: mongoose.model("Author", AuthorSchema),
  Product: mongoose.model("Product", ProductSchema)
};
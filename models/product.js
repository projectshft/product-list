// import mongoose
const mongoose = require("mongoose");

// shorter variable for mongoose schema
const Schema = mongoose.Schema;

// create a review Schema
const reviewSchema = new Schema({
  userName: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: "Product"},
});

const Review = mongoose.model("review", reviewSchema); 


// create a Product Schema
const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [
    {
      type: Schema.Types.ObjectId, ref: "review"
    }
  ],
});

// export Product model using ProductSchema
module.exports = {
  Product: mongoose.model('Product', ProductSchema), Review: mongoose.model('Review', reviewSchema)} 
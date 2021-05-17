const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema ({
  userName: String,
  text: String, 
})

const Review = mongoose.model("Review", ReviewSchema);

const ProductSchema = new Schema ({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [ReviewSchema]
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = { Review, Product };


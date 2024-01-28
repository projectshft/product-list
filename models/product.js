const mongoose = require("mongoose");
const Schema = mongoose.Schema;

ReviewSchema = new Schema({
  userName: String,
  text: String,
})

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [ReviewSchema],
});

ProductSchema.index({'$**': 'text'})

module.exports = {
  Product: mongoose.model("Product", ProductSchema),
  Review: mongoose.model("Review", ReviewSchema)
}

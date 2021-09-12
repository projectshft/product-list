const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Only the name and price of the product are required
const ProductSchema = new Schema({
  category: String,
  name: {
    type: String,
    required: [true, 'Product must have name']
  },
  price: {
    type: Number,
    required: [true, 'Product must have price']
  },
  image: String,
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
});

module.exports = mongoose.model("Product", ProductSchema);
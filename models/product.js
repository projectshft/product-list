const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewModel = require('./review')

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{type: Schema.Types.ObjectId, ref: 'ReviewModel'}]
});

let ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reviewSchema = require("./productreview")

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'reviews' }]
})

module.exports = mongoose.model('product', ProductSchema)
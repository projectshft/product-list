const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reviewSchema = require("./review")

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [reviewSchema]
})

module.exports = mongoose.model('Product', ProductSchema)
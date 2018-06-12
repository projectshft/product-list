const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ReviewSchema = require('./review');

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [ReviewSchema]
})

module.exports = mongoose.model('Product', ProductSchema)
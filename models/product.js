const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: []
})

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  product: ProductSchema
})

module.exports = mongoose.model('Product', ProductSchema)
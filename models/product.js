const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [ReviewShema]
})

const ReviewSchema = new Schema({
    userName = String,
    text = String,
    productId = ProductSchema._id
})

module.exports = mongoose.model('Product', ProductSchema)

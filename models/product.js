const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Review = require('./review')


const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: {type: mongoose.Schema.Types.ObjectId, ref: 'Review'}
})

module.exports = mongoose.model('Product', ProductSchema)
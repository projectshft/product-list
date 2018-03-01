const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ReviewSchema = require('../models/review').schema

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [ReviewSchema]
})

module.exports = { ProductSchema: ProductSchema, Product: mongoose.model('Product', ProductSchema) }
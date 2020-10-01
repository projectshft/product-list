const mongoose = require('mongoose')
const Product = require('product')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: 'product'}
})

module.exports = mongoose.model('Review', ReviewSchema)

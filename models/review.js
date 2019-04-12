const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  productId: { type: Schema.Types.ObjectId, ref: 'product' }
})

const Review = mongoose.model('review', ReviewSchema)

module.exports = Review

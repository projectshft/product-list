const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  userName: String,
  reviewText: String,
  product: {type: Schema.Types.ObjectId, ref: 'Product'}
});

module.exports = mongoose.model('Review', ReviewSchema)
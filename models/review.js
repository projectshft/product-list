const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  enabled: Boolean
})

module.exports = mongoose.model('Review', ReviewSchema)
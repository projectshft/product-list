const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  userName: String,
  text: String
})

module.exports = mongoose.model('Review', ReviewSchema)
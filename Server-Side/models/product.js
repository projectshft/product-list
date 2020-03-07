const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
})

module.exports = mongoose.model('Product', productSchema)
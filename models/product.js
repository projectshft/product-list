const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'reviews' }]
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product


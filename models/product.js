const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String
})

// Export product collection
module.exports = mongoose.model('Product', ProductSchema)
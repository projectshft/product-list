const mongoose = require('mongoose')
const Schema = mongoose.Schema

//This creates a Schema that involves using Mongoose as seen above. Below, you will be enabled to receive the category, name, price and image of a product from the backend. 
const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'reviews' }]
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product


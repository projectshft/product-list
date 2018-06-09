const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  userName: {type: String, required: true},
  text: {type: String, required: true},
  product: {type: Schema.Types.ObjectId, required: true}
});


const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [ReviewSchema]
})

module.exports = {Product: mongoose.model('Product', ProductSchema), Review: mongoose.model('Review', ReviewSchema)}
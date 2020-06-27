const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  userName: String,
  text: String,
});

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [ReviewSchema]
})



module.exports.Product = mongoose.model('Product', ProductSchema)
module.exports.Review = mongoose.model('Review', ReviewSchema)
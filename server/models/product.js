const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  userName: String,
  text: String
})

/* The Product Schema defines the structure of our product documents, and will map to the
   Products collection in the MongoDB. Each document will have a Review subdoc that belongs
   to it (see above)
*/   
const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [ReviewSchema]
})

module.exports = mongoose.model('Product', ProductSchema)
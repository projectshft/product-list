const mongoose = require('mongoose')
const Schema = mongoose.Schema


const reviewSchema = new Schema({
  userName: String,
  text: String,
  productId: { type: Schema.Types.ObjectId, ref: 'product'}
});

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }]
});

module.exports = mongoose.model('Review', reviewSchema);

module.exports = mongoose.model('Product', ProductSchema)


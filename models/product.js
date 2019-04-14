const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/products')

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'review'}]
});

const Product = mongoose.model('product', ProductSchema);

const ReviewSchema = new Schema({
    userName: String,
    text: String,
    product: { type: Schema.Types.ObjectId, ref: 'product'}
});

const Review = mongoose.model('review', ReviewSchema);

module.exports = mongoose.model('Product', ProductSchema);
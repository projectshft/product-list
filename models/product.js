const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { reviewSchema } = require('./review');

const productSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [ reviewSchema ]
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
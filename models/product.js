const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { reviewSchema } = require('./review');

const productSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [ reviewSchema ] // Adding reviews as subdocuments
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
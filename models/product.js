const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  username: String,
  text: String,
});

const productSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [reviewSchema],
});

module.exports = mongoose.model('Product', productSchema);

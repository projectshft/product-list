const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }],
});
productSchema.index({ name: 'text', 'name': 'text' });

const Product = mongoose.model('product', productSchema);

module.exports = Product;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
});

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }],
  // reviews: [ReviewSchema],
});

module.exports = {
  Product: mongoose.model('Product', ProductSchema),
  Review: mongoose.model('review', ReviewSchema),
};

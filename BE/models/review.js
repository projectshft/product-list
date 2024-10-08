const mongoose = require('mongoose');

// Review Schema
const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

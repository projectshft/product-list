const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  // Id to reference the post this review belongs to
  product: { type: Schema.Types.ObjectId, ref: 'Product' }
});

// Export product collection
module.exports = mongoose.model('Review', ReviewSchema); 
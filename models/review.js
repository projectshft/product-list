/** @module review */
/** Create model for review data */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  username: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: 'product' }
});

module.exports = mongoose.model('review', ReviewSchema);

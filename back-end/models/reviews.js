const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewsSchema = new Schema({
  userName: String,
  text: String,
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
});

const Reviews = mongoose.model('review', reviewsSchema);
module.exports = Reviews;

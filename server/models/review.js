const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const { Schema } = mongoose;

const reviewSchema = new Schema({
  text: String,
  username: String,
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
});

module.exports = mongoose.model('Review', reviewSchema);

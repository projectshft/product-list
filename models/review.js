const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    userName: String,
    text: String,
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
  },
  {
    collation: { locale: 'en', strength: 2 },
  }
);

module.exports = mongoose.model('Review', ReviewSchema);

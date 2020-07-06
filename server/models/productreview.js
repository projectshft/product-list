const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    userName: String,
    product: [{ type: Schema.Types.ObjectId, ref: 'product' }],
    text: String
  });

  module.exports = mongoose.model('review', ReviewSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  id: Number,
  userName: String,
  text: String,
  product: Number
});

module.exports = mongoose.model('Review', ReviewSchema);
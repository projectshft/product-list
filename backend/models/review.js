const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  username: String,
  text: String,
});

module.exports = { reviewSchema };
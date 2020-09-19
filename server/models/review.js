const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
  const reviewSchema = new Schema({
    username: { type: String, required: true },
    text: { type: String, required: true },
  });

  module.exports = reviewSchema;
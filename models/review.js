const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userName: String,
  text: Number,
});

module.exports = ReviewSchema;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    username: String,
    text: String,
  });

  module.exports = mongoose.model("Review", ReviewSchema);
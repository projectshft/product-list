const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  username: { type: String, required: true },
  text: { type: String, required: true }
})

module.exports = mongoose.model("Review", ReviewSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  rating: Number,
  product: { type: Schema.Types.ObjectId, ref: "Product"}
  }, { collection: "reviews" })

module.exports = mongoose.model("Review", ReviewSchema);
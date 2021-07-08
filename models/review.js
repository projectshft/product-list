const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userName: String,
  text: String,
  product_id: { type: Schema.Types.ObjectId, ref: "Product" },
});

const Review = mongoose.model("review", reviewSchema);

module.exports = { Review };

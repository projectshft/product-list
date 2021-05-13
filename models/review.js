const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Product = require("./product");

const reviewSchema = new Schema({
  username: String,
  test: String,
  product: {type: Schema.Types.ObjectId, ref: "Product"}
})

module.exports = mongoose.model("Review", reviewSchema);
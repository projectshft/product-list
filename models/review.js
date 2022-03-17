const mongoose = require("mongoose");
const Product = require("./product")

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  username: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: "Product" },

});


module.exports = mongoose.model("review", reviewSchema);
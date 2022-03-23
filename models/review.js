const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require('../models/product')

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Review", ReviewSchema);
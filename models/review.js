const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductModel = require('./product');

const ReviewSchema = new Schema({
  username: String,
  text: String,
  product: {type: Schema.Types.ObjectId, ref: 'ProductModel'}
});

let ReviewModel = mongoose.model("Review", ReviewSchema);

module.exports = ReviewModel
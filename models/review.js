const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  text: {
    type: String,
    required: [true, 'Review must have text']
  },
  username: String,
  product: {type: Schema.Types.ObjectId, ref: 'Product'}
})

module.exports = mongoose.model("Review", ReviewSchema);
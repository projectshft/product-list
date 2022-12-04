const mongoose = require('mongoose')

const { Schema } = mongoose;

const reviewSchema = new Schema({
  userName: String,
  text: String,
  product: ({type: Schema.Types.ObjectId, ref: 'Product'}),
}, {timestamps: true})

module.exports = mongoose.model("Review", reviewSchema);
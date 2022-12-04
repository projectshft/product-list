const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: ({type: Schema.Types.ObjectId, ref: 'Review'}),
}, {timestamps: true})

module.exports = mongoose.model("Product", productSchema)
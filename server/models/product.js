const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const { Schema } = mongoose;

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

module.exports = mongoose.model('Product', ProductSchema);

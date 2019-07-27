const mongoose = require('mongoose')
const Schema = mongoose.Schema
const paginate = require('mongoose-paginate');

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'review'}]
})

ProductSchema.plugin(paginate);

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;
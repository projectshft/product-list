const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  //reviews are not populating. GO DO THAT!
  reviews: [{type: Schema.Types.ObjectId, ref: 'review'}]
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;


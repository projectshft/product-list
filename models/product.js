const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
});
productSchema.index({name: 'text'});

const reviewSchema = new Schema({
  userName: String,
  text: String,
  product: {type: Schema.Types.ObjectId, ref: 'Product'}
})

module.exports = {
  Product: mongoose.model('Product', productSchema),
  Review: mongoose.model('Review', reviewSchema)
}
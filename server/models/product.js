const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Review = require('./review')

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
})

//pre-product delete middleware action
ProductSchema.pre('remove', function (next){
  this.model('Review').deleteMany({ product: this._id}, next);
 })
 

module.exports = mongoose.model('Product', ProductSchema)
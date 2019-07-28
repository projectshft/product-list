const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  category: {type: String, index: true},
  name: String,
  price: Number,
  image: String,
  reviews: [ { type: Schema.Types.ObjectId, ref: 'Review' } ],
  enabled: Boolean,
  created_at: Date,
  updated_at: Date
})

ProductSchema.pre('save', function(next) {
  //get current date
  const currentDate = new Date();
  //change the update_at field to current date
  this.updated_at = currentDate;
  //if create_at doesnt exist, add
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
})

module.exports = mongoose.model('Product', ProductSchema)
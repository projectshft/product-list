const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  enabled: Boolean,
  created_at: Date,
  updated_at: Date
})

ReviewSchema.pre('save', function(next) {
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

module.exports = mongoose.model('Review', ReviewSchema)
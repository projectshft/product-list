const mongoose = require('mongoose')
const Schema = mongoose.Schema

//This is a Schema that uses Mongoose as seen above. Below, it enables you to create a review within a Product. 
const ReviewSchema = new Schema({
    reviewText: String,
    userName: String,
    text: String,
    product: { type: Schema.Types.ObjectId, ref: 'product' }
  })
  
  module.exports = mongoose.model('Review', ReviewSchema);
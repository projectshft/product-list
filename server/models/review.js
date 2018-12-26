const mongoose = require('mongoose')
const Schema = mongoose.Schema



const ReviewSchema = new Schema({
  userName: String,
  text: String,
  product: String
})

const Review = mongoose.model('Review', ReviewSchema)



module.exports = Review;
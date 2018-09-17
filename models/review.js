const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  book: String,
  review: []
})

module.exports = mongoose.model('Review', ReviewSchema)
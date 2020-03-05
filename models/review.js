const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    text: String,
    userName: String
})

module.exports = reviewSchema
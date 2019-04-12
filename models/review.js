const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    userName = String,
    text = String,
    productId = ProductSchema._id
})

const Review = mongoose.model('review', ReviewSchema)

module.exports = Review
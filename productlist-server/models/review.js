const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    username: String,
    text: {
        type:String,
        required: true
    }
})

module.exports = ReviewSchema;
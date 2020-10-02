const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    userName: String,
    text: String,
    product: String
});


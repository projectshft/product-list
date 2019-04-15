const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/products')

const ReviewSchema = new Schema({
    userName: String,
    text: String,
    product: { type: Schema.Types.ObjectId, ref: 'product'}
});

const Review = mongoose.model('review', ReviewSchema);

module.exports = mongoose.model('Review', ReviewSchema);
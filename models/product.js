const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductSchema = new Schema({
    _id: Schema.Types.ObjectId,
    category: String,
    name: String,
    price: Number,
    image: String,
    reviews: [{type: String, ref: 'review'}]
})

module.exports = mongoose.model('Product', ProductSchema)

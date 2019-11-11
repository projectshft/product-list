const mongoose = require('mongoose')
const Schema = mongoose.Schema

//The Schema that our new products use 
const ProductSchema = new Schema({
    category: String,
    name: String,
    price: Number,
    image: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
})

module.exports = mongoose.model('Product', ProductSchema);


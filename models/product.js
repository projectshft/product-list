const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
	userName: String,
	text: String,
	product: { type: Schema.Types.ObjectId, ref: 'product' }
})

const ProductSchema = new Schema({
	category: String,
	name: String,
	price: Number,
	image: String,
	reviews: [ReviewSchema]
})

module.exports = mongoose.model('product', ProductSchema)

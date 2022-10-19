const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
	userName: String,
	text: String,
	product: { type: Schema.Types.ObjectId, ref: 'product' },
});

const Review = mongoose.model('review', ReviewSchema);

const ProductSchema = new Schema({
	category: String,
	name: String,
	price: Number,
	image: String,
	reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }],
});

const Product = mongoose.model('product', ProductSchema);

let product1 = new Product({
	category: 'Electronics',
	name: 'iPhone 11',
	price: 699,
	image: 'https://via.placeholder.com/250?text=Product+Image',
	reviews: [],
});

let review1 = new Review({
	product: product1._id,
	userName: 'John Doe',
	text: 'This is a great product!',
});

review1.save();
product1.reviews.push(review1);

product1.save();
console.log(product1);
console.log(product1.reviews[0]);

module.exports = mongoose.model('Product', ProductSchema);

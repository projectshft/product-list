const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const Review = require('./review');

const ProductSchema = new Schema({
	category: String,
	name: String,
	price: Number,
	image: String,
	reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }],
});

ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model('product', ProductSchema);

let product1 = new Product({
	category: 'Electronics',
	name: 'Hello World',
	price: 1144,
	image: 'https://via.placeholder.com/250?text=Product+Image',
	reviews: [],
});

let review1 = new Review({
	product: product1._id,
	userName: 'Rewrote',
	text: 'Fantastic electronic!',
});

let review2 = new Review({
	product: product1._id,
	userName: 'Jordacai',
	text: 'This electronic is LIT!',
});

let review3 = new Review({
	product: product1._id,
	userName: 'Tilda',
	text: 'It\'s Electronic-central in here!',
});

let review4 = new Review({
	product: product1._id,
	userName: 'Cozmo',
	text: 'I am unimpressed with the nature of this particular electronic.',
});

let review5 = new Review({
	product: product1._id,
	userName:'Frank',
	text: 'There\'s nothin to it, but to do it.',
});

review1.save();
review2.save();
review3.save();
review4.save();
review5.save();

product1.reviews.push(review1, review2, review3, review4, review5);
product1.save();

module.exports = mongoose.model('Product', ProductSchema);

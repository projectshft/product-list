const mongoose = require('mongoose')
const Schema = mongoose.Schema
const paginate = require('mongoose-paginate')

const ReviewSchema = new Schema({
	username: String,
	text: String,
	product: { type: Schema.Types.ObjectId, ref: 'product'},
  });

ReviewSchema.plugin(paginate);
const Review = mongoose.model('review', ReviewSchema);
module.exports = Review;
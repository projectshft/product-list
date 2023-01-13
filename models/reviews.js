const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
  userName: String,
  reviewText: String,
  product: { type: Schema.Types.ObjectId, ref: 'MyProducts'},
});



module.exports = mongoose.model('Reviews', ReviewsSchema)
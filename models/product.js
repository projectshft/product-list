const mongoose = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

// using population to store reviews here
// subdocs also works in this case
const ReviewSchema = new Schema({
  userName: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
});

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }],
});

// ProductSchema.plugin(mongoosePaginate);

module.exports = {
  Product: mongoose.model('Product', ProductSchema),
  Review: mongoose.model('review', ReviewSchema),
};

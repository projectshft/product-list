const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const ProductSchema = require('./Product').schema;

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: 'Product' }
});

ReviewSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Review', ReviewSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
})

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', ProductSchema);

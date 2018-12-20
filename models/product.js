const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');


const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{type: Schema.Types.ObjectId, ref: 'review'}]
});

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('product', ProductSchema);
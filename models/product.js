const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  category: { type: String },
  name: { type: String },
  price: Number,
  image: { type: String },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});
ProductSchema.index({ name: 'text', category: 'text', image: 'text' });

module.exports = mongoose.model('Product', ProductSchema);

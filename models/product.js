const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

// add text index for searching products by their name field
ProductSchema.index({ name: 'text' });

module.exports = mongoose.model('Product', ProductSchema);

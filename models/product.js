const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

// Add 'text' index for category to help prevent case sensitivity issues
ProductSchema.index({ category: 'text' });

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product };

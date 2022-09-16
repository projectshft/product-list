const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    category: String,
    name: String,
    price: Number,
    image: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  },
  {
    collation: { locale: 'en', strength: 2 },
  }
);

module.exports = mongoose.model('Product', ProductSchema);

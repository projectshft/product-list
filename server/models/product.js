const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  enabled: { type: Boolean, required: true },
  dateAdded: { type: Date, required: true },
  dateLastModified: { type: Date, required: true },
  reviews: [{ type: Schema.Types.ObjectId, res: 'Review' }]
})

module.exports = mongoose.model('Product', ProductSchema)
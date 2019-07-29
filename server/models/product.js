const mongoose = require('mongoose')
const Schema = mongoose.Schema

//This product Schema incldues an enabled property to be utilized when the delete('/products/:product') route is acccessed.  The Product's "enabled" property will be changed to "false", and that product will no be sent on get requests, but will remain in the database.
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
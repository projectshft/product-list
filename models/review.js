const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  //_id: Schema.Types.ObjectId,
  userName: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: 'product' }
})

module.exports = mongoose.model('Review', ReviewSchema)



// userName
// text
// product (an id of the product that the review is associated with - this is optional if you're using sub-docs)
// Let's implement a reviews array for each product - it's up to you whether you use "sub-docs" or "refs and population".

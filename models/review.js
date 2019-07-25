const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  userName: {type: Schema.Types.ObjectId, ref: 'user'},
  text: String,
  product: {type: Schema.Types.ObjectId, ref: 'product'}
})

module.exports = mongoose.model('review', ReviewSchema);
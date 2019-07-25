const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  reviews: [{type: Schema.Types.ObjectId, ref: 'review'}]
})

module.exports = mongoose.model('user', UserSchema);
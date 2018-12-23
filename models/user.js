const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: String,
  cart: [{type:Schema.Types.ObjectId, ref:'Product'}],
  password:String
})



module.exports = mongoose.model('User', UserSchema)
const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  userName: String,
  text: String
})

ReviewSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Review", ReviewSchema)

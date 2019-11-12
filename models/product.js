const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{type: Schema.Types.ObjectId, ref: 'Reviews'}]
})

// const ReviewSchema = new Schema({
//   username: String,
//   text: String,
//   product: [{type: Schema.Types.ObjectId, ref: 'Product'}]
// });

// module.exports = mongoose.model('Reviews', ReviewSchema);


module.exports = mongoose.model('Product', ProductSchema);
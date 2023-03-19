const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const AuthorSchema = new Schema({
  name: String,
  reviews: [{type: Schema.Types.ObjectId, ref: "review"}]
})

const ReviewSchema = new Schema({
  review: String,
  author: [{type: Schema.Types.ObjectId, ref: "author" }],
  product: [{type: Schema.Types.ObjectId, ref: "Product" }]

})

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{type: Schema.Types.ObjectId, ref: "review"}]
});

module.exports = mongoose.model("review", ReviewSchema);
module.exports = mongoose.model("author", AuthorSchema);
module.exports = mongoose.model("Product", ProductSchema);
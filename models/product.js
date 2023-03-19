const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const AuthorSchema = new Schema({
  name: String,
  reviews: [{type: Schema.Types.ObjectId, ref: "Review"}]
})
const Author = mongoose.model("Author", AuthorSchema);

const ReviewSchema = new Schema({
  review: String,
  name: [{type: Schema.Types.ObjectId, ref: "Author" }],
  product: [{type: Schema.Types.ObjectId, ref: "Product" }]
})
const Review = mongoose.model("Review", ReviewSchema);

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [ReviewSchema]
});
const Product = mongoose.model("Product", ProductSchema);

module.exports = mongoose.model("Review", ReviewSchema);
module.exports = mongoose.model("Author", AuthorSchema);
module.exports = mongoose.model("Product", ProductSchema);
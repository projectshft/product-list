const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "review" }],
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = mongoose.model("Product", ProductSchema);

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  product: [{ type: Schema.Types.ObjectId, ref: "product" }],
});
const Review = mongoose.model("Review", ReviewSchema);
module.exports = mongoose.model("Review", ReviewSchema);

Product.findOne({ name: "Product 1" })
  .populate("reviews")
  .exec((err, product) => {
    console.log(product);
  });

let product1 = new Product({
  name: "Product 1",
  reviews: [],
});

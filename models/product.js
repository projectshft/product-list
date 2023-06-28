const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userName: String,
  reviewText: String,
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
});

const Review = mongoose.model("Review", ReviewSchema);

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

const Product = mongoose.model("Product", ProductSchema);

// let testProduct = new Product ({
//   category: "Test Category",
//   name: "Test",
//   price: 5,
//   image: "Test-image",
//   reviews: [],
// });

// let review1 =  new Review({
//   userName: "User 1",
//   reviewText: "Review 1",
//   productId: testProduct._id,
// });

// let review2 =  new Review({
//   userName: "User 2",
//   reviewText: "Review 2",
//   productId: testProduct._id,
// });

// let review3 =  new Review({
//   userName: "User 3",
//   reviewText: "Review 3",
//   productId: testProduct._id,
// });

// let review4 =  new Review({
//   userName: "User 4",
//   reviewText: "Review 4",
//   productId: testProduct._id,
// });

// let review5 =  new Review({
//   userName: "User 5",
//   reviewText: "Review 5",
//   productId: testProduct._id,
// });

// review1.save();
// review2.save();
// review3.save();
// review4.save();
// review5.save();

// testProduct.reviews.push(review1, review2, review3, review4, review5);

// testProduct.save();



module.exports = { Product, Review };
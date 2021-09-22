const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/products");


const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
});

ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", ProductSchema);

// let gold = new Product({
//   category: "Home",
//   name: "Golden Monkey Foot",
//   price: 1000,
//   image: String,
//   reviews: [],
// });
// // gold.save();




// gold.reviews.push(review);
// console.log(gold);

// Product.find( { _id: '6140adb146a3c7d2af51fbb9' })
//   .exec((err, product) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(product.category);
//       // product.reviews.push(review);
//       // console.log(product.reviews);
//   }
// })

// table.update({ _id: '613fe75de59ff0e94da16da2'}, {$push: {reviews: review}} );

// table.reviews.push(review);
// table.save();


module.exports = Product;
// module.exports = Review;

// Go back to Node eval.. spend some time
// The testing part is super important.
// TDD - every interview will ask you about
// Pay attn to the process...
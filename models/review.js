const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const Product = require("./product");
const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/products");


const ReviewSchema = new Schema({
  userName: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: "Product"}
});

ReviewSchema.plugin(mongoosePaginate);

const Review = mongoose.model("Review", ReviewSchema);


// let product1 = new Product({
//   category: "Ass",
//   name: "Tits",
//   price: 1000000,
//   reviews: [],
// })

// Product.find({name: "Tits"}, (err, result) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(result);
// });

// Product.findOne({_id: "6147a686d8b3d2a67f3af911"}, (err, result) => {
//   if (err) {
//     return console.log(err);
//   }
//   const review1 = new Review({
//     userName: 'Mitch',
//     text: 'hi nino',
//     product: result._id
//   })
//   review1.save();
//   result.reviews.push(review1);
//   result.save()
//   console.log(result);
//   })




// let product = Product.findOne({name: "Tits"});
// console.log(product);

// function addReview() {
//   Product.findOne({name: "Tits"})
//     .save(function(err){
//       if (err) return err;

//       const review1 = newReview({
//         userName: 'Buddy',
//         text: 'umm.... mom?',
//         product: this._id
//       })

//       review1.save(function(err){
//         if (err) return err;
//       });

//     })

// }

// addReview();



// let review1 = new Review({
//   userName: 'Nina',
//   text: 'ehh',
//   product: product1._id
// });
// review1.save();
// product1.reviews.push(review1);
// product1.save();


// console.log(JSON.stringify(Product.find({_id: '613fe75de59ff0e94da16db0'}).schema.obj.reviews))
// .reviews.push(review);

// Product.find({_id: '613fe75de59ff0e94da16db0'}).schema.obj.reviews.push(review);

// product = Product.find({_id: '613fe75de59ff0e94da16db0'});
// product.reviews.push(review);
// product.save();
// // Product.find({_id: '613fe75de59ff0e94da16db0'}).save();

module.exports = Review;

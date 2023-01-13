const router = require("express").Router();
const {faker} = require("@faker-js/faker");

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MyProductsSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

ReviewSchema = new Schema({
  userName: String,
  reviewText: String,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'MyProducts'}
})

const MyProducts = mongoose.model('MyProducts', MyProductsSchema);
const Review = mongoose.model('Review', ReviewSchema);

//LOAD DB WITH FAKE DATA = DONE
// router.get("/generate-fake-data", (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let myProducts = new MyProducts();

//     myProducts.category = faker.commerce.department();
//     myProducts.name = faker.commerce.productName();
//     myProducts.price = faker.commerce.price();
//     myProducts.image = "https://via.placeholder.com/250?text=Product+Image";

//     myProducts.save((err) => {
//       if (err) throw err;
//     });
//   }
//   res.end();
// });

//IMPLEMENT PAGINATION = DONE
router.get("/myProducts", (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;

  MyProducts.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, myProducts) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      MyProducts.count().exec((err, count) => {
        if (err) return next(err);

        res.send(myProducts);
        });
        //console.log(myProducts)
    });
})

//CREATE NEW PRODUCT = DONE
router.post('/myProducts', (req, res) => {
const newProduct = new MyProducts({
  category: 'Health',
  name: 'Cool Purple Medicine Ball',
  price: 25,
  image: 'https://via.placeholder.com/250?text=Product+Image',
  reviews: [],
})
});
// // newProduct.save()
// // .then(product => {
// //   res.send('product saved to db');
// // })
// // .catch(err => {
// //   res.status(400).send('unale to save to database');
// // });
// // });

//Test finding product - product exists
// MyProducts.findOne({ _id: '63c177565a5cbb2634522d50'}, function (err, doc) {
//   console.log(doc)
// });

// //CREATE PRODUCT REVIEW = DONE & VERIFIED IN MONGODB COMPASS
router.post('/myProducts/:product/reviews', (req, res) => {
const { product } = req.params;   
const newProductReview = new Review({
  userName: 'Jillannette',
  reviewText: 'Awesome product!',
  product: product._id
  
})
console.log(product._id)
// newProductReview.save()
//   res.send('review saved to db');
//   product.reviews.push(newProductReview)
//   product.save()
//   console.log(newProductReview)
});

//***START HERE*** Object Ids are not making it into respective fields:  */
//review Object Id is not making it into newProduct reviews field
//product Object Id is not making it into newProductReview product field.  
//double check the method, something is off.  Code below DOES NOT WORK.

MyProducts.findOne({ name: 'Cool Purple Medicine Ball'})
.populate('reviews')
.exec(function (err, myProducts) {
  if (err) 
  console.log(myProducts)
});

module.exports = router;
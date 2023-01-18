const router = require("express").Router();
const {faker} = require("@faker-js/faker");

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MyProductsSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "review" }]
});

ReviewSchema = new Schema({
  userName: String,
  reviewText: String,
  product: { type: Schema.Types.ObjectId, ref: 'myProducts'}
});

const MyProducts = mongoose.model('myProducts', MyProductsSchema);
const Review = mongoose.model('review', ReviewSchema);

//1. //LOAD DB WITH FAKE DATA = DONE
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

//2. IMPLEMENT PAGINATION = DONE
// router.get("/myProducts", (req, res, next) => {
//   const perPage = 9;

//   // return the first page by default
//   const page = req.query.page || 1;

//   MyProducts.find({})
//     .skip(perPage * page - perPage)
//     .limit(perPage)
//     .exec((err, myProducts) => {
//       // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
//       MyProducts.count().exec((err, count) => {
//         if (err) return next(err);

//         res.send(myProducts);
//         });
//         //console.log(myProducts)
//     });
// })

//GET ALL PRODUCTS (minus pagination) (NOT REQUIRED, EXAMPLE ONLY)
// router.get('/myProducts', (req, res) => {
//   MyProducts.find({})
//   .then(products => res.json(products));
// });

//3. CREATE NEW PRODUCT = DONE
// const newProduct = new MyProducts({
//   category: 'Health',
//   name: 'Cool Purple Medicine Ball',
//   price: 25,
//   image: 'https://via.placeholder.com/250?text=Product+Image',
//   reviews: [],
// })
// console.log('newProductId ' + newProduct._id);

//4. CREATE REVIEW FOR PRODUCT CREATED = DONE - (newProductReview.product matches newProduct._id)
// const newProductReview = new Review({
//   userName: 'Jillannette',
//   reviewText: 'Awesome product for the price!',
//   product: newProduct._id
// })
//newProductReview.save();
// console.log('newProductReview.product ' + newProductReview.product);
// console.log('newProduct.reviews ' + newProduct.reviews)
//5. PUSH REVIEW TO PRODUCT.REVIEWS ARRAY = DONE (newProduct.reviews id is that of newProductReview._id))
//newProduct.reviews.push(newProductReview)
//newProduct.save();

//6. CREATE GET ROUTE FOR PRODUCT BY PRODUCT ID (using path parameter) = DONE
// router.get('/myProducts/:product', (req, res, next) => {
//   MyProducts.findById(req.params.product)
//   .then(result => res.status(200).send(result))
//   .catch(err => res.status(500).send(err));
// })

//7. CREATE GET ROUTE FOR REVIEWS BY PRODUCT ID using path parameter = *CHECK ROUTE AFTER ADDING MORE REVIEWS
// router.get('/myProducts/:product/reviews', (req, res, next) => {
//   const perProduct = 4;
//   const page = req.query.page || 1;
//   MyProducts.findById({ _id: req.params.product  })
//   .skip(perProduct * page - perProduct)
//   .limit(perProduct)
//   .populate('reviews')
//   .exec((err, product) => {
//   console.log(product);
//   });
// });

//8. REFACTOR ABOVE ROUTE TO LIMIT TO 4 REVIEWS AND PASS PAGE QUERY PARAMETER TO PAGINATE

//9. POST ROUTE TO ADD NEW PRODUCT TO DB = DONE
// router.post('/myProducts', (req, res) => {
//   const addProduct = new MyProducts({
//     category: req.body.category,
//     name: req.body.name,
//     price: req.body.price,
//     image: req.body.image,
//     reviews: []
//   })
//   addProduct.save()
//   .then(product => res.json(product));
//   res.status(200).json({ addProduct });
// });

router.post('/myProducts:', (req, res, next) => {
  let addProduct = new MyProducts({
    _id: new mongoose.Types.ObjectId(),
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    reviews: [],
  })
  addProduct.save();
  res.send(addProduct);
});
//10. CREATE ROUTE TO ADD REVIEW TO PRODUCT BY PRODUCT ID
//COMMITTED THIS BLOCK BUT IT IS NOT SAVING THE REVIEW_ID TO PRODUCT.REVIEWS ARRAY
// router.post('/myProducts/:product/reviews', (req, res, next) => {
//   const product = {_id: req.params.product}
//   let addReview = new Review({
//     _id: mongoose.Types.ObjectId(),
//     userName: req.body.userName,
//     reviewText: req.body.reviewText,
//     product: product
//   })
//   addReview.save((err, review) => {
//     res.send(review)
//   });
//   console.log(product.reviews)
// });

/////STUCK HERE//////TRYING DIFFERENT WAY TO HANDLE
// router.post('/myProducts/:product/reviews', (req, res, next) => {
//   const product = {_id: req.params.product}
//   let addReview = new Review({
//     _id: mongoose.Types.ObjectId(),
//     userName: req.body.userName,
//     reviewText: req.body.reviewText,
//     product: product
//   })
//   addReview.save();
//   MyProducts
//   .find({reviews: []})
//   .populate("review")
//   .exec((err, product) => {
//    res.send(product);
//   });
// });


//11. DELETE PRODUCT{} BY PRODUCT ID
// Review.findOneAndDelete({_id: '63c583c700d1ec838197c5d7'}, (err, newProduct) => {
//   if (err) console.log(err)
//   console.log(newProduct)
// });

//DELETE REVIEW BY PRODUCT ID
// Review.findOneAndDelete({_id: '63c583c700d1ec838197c5d7'}, (err, newProductReview) => {
//   if (err) console.log(err)
//   console.log(newProductReview)
// });
 

//**SAVE FOR TESTING  */
//Test finding product - product exists
// MyProducts.findOne({ _id: '63c177565a5cbb2634522d50'}, function (err, doc) {
//   console.log(doc)
// });

//***SAVE FOR LATER TESTING  */
//Check if review exists 
// Review.findOne({ _id: '63c1d0e6e2159deef5255f51'}, function (err, doc) {
//   console.log(doc)
// });

module.exports = router;

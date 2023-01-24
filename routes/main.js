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

    //myProducts.save((err) => {
  //     if (err) throw err;
  //   });
  // }
  // res.end();
//}});


//2. IMPLEMENT PAGINATION = DONE
// router.get("/myProducts", (req, res, next) => {
//   const perPage = 9;

//   // return the first page by default
//   const page = req.query.page || 1;

// const category = req.query;
// const myProducts = {};

// if (category) {
//   myProducts.category = category;
// }
  
//   MyProducts.find({})
//     .skip(perPage * page - perPage)
//     .limit(perPage)
//     .exec((err, myProducts) => {
//       // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
//     if (err) return next (err);
//     res.send({category: req.query.category})  //logs, literally 'music'!!  
    
//     });
  
//       MyProducts.count().exec((err, count) => {
//           if (err) return next(err);
//     });
//   });
//});
       

router.get('/myProducts', async (req, res, next)  => {
  
  const shoes = await MyProducts.find({ category: 'Shoes' })
  .exec()
  console.log(shoes)
  
});  

//***************** */
//GET ALL PRODUCTS (minus pagination) (NOT REQUIRED, EXAMPLE ONLY)
// router.get('/myProducts', (req, res) => {
//   const productCat = req.params.category;
  
//   if (!productCat) {
//     return console.log('Must enter a valid product category to complete this search')
//   }

//   MyProducts.find({
//     if ()
//   })

//     .exec((err, )
// });  



//***************** */
//3. CREATE NEW PRODUCT = DONE 
// const newProduct = new MyProducts({     //id = 63c866dd3d0fb78401025d7e
//   category: 'Health',
//   name: 'Cool Purple Medicine Ball',
//   price: 25,
//   image: 'https://via.placeholder.com/250?text=Product+Image',
//   reviews: [],
// })
// console.log('newProductId ' + newProduct._id);

//**************** */
// //4. CREATE REVIEW FOR PRODUCT CREATED = DONE - (newProductReview.product matches newProduct._id)
// const newProductReview = new Review({         //id = 63c866dd3d0fb78401025d7f
//   userName: 'Jillannette',
//   reviewText: 'Awesome product for the price!',
//   product: newProduct._id
// })
// newProductReview.save();
// // console.log('newProductReview.product ' + newProductReview.product);
// // console.log('newProduct.reviews ' + newProduct.reviews)

//**************** */
// //5. PUSH REVIEW TO PRODUCT.REVIEWS ARRAY = DONE (newProduct.reviews id is that of newProductReview._id))
// newProduct.reviews.push(newProductReview)
// newProduct.save();

//**************** */
//LOOK AT THIS AGAIN RE: ASYNC/AWAIT 6. CREATE GET ROUTE FOR PRODUCT BY PRODUCT ID (using req.query) = DONE
// router.get('/myProducts/:product', async (req, res) => {
//   const {selectedProductId} = req.query;
  
//   try {
//     await MyProducts.findById({_id: selectedProductId})
//     res.status(200).send({'Product received': selectedProductId});
//   } catch (err) {
//     console.log(err)
//       res.status(400).json({ message: err });
//     }
//   });
  
//**************** */
//START HERE TO REFACTOR BY ADDING OPTIONAL CATEGORY QUERY 
//7. CREATE GET ROUTE FOR REVIEWS BY PRODUCT ID using path parameter, limited to 4 reviews = DONE **REFACTOR
//PASS PAGE QUERY PARAMETER TO PAGINATE 
// router.get('/myProducts/:product/reviews', (req, res, next) => {
//   const perProduct = 4;
//   //const page = req.query.page || 1;
//   MyProducts.findById({ _id: req.query.product  })
//   //.skip(perProduct * page - perProduct)
//   .limit(perProduct)
//   .populate('reviews')
//   .exec((err, data) => {
//   console.log(data);
//   });
// });

//******************/
//REFACTOR USING ASYNC/AWAIT/TRY/CATCH 9. POST ROUTE TO ADD NEW PRODUCT TO DB = DONE
// router.post('/myProducts:', (req, res, next) => {
//   let addProduct = new MyProducts({
//     _id: new mongoose.Types.ObjectId(),
//     category: req.body.category,
//     name: req.body.name,
//     price: req.body.price,
//     image: req.body.image,
//     reviews: [],

//   })
//   // addProduct.save();
//   // res.send(addProduct);
// });

//******************/
//REFACTOR  USING ASYNC/AWAIT/TRY/CATCH   10. CREATE ROUTE TO ADD REVIEW TO PRODUCT BY PRODUCT ID - SUCCESSFUL, NEED TO CLEAN UP
// router.post('/myProducts/:product/reviews', async(req, res, next) => {
//   let addReview = new Review({
//     userName: req.body.userName,
//     reviewText: req.body.reviewText,
//     product: req.body.product
//   })
//   addReview.save();
//   const addReviewId = addReview._id
//   //console.log('addReviewId' + addReviewId)
//   const productId = req.body.product
//   //console.log('productId' + productId)
//   //const productId = '63c85f6b237dbf774bec7132';
  
//   const productToUpdate = await MyProducts.findById(productId)
//   productToUpdate.reviews.push(addReviewId)
//   productToUpdate.save((err, data) => {
//     if (err) return next (err);
//     res.send(data)
//   });
//   //console.log('reviews' + productToUpdate.reviews)
//  });

//******************/
//OK 11. DELETE PRODUCT BY PRODUCT ID = DONE, USING PETER'S SUGGESTION (USED PRODUCTID AS KEY IN POSTMAN)
// router.delete('/myProducts/:product', async (req, res) => {
//   const { productId } = req.body; // I sent as query, need to understand sending in body: (assuming you're sending this data in your request...)

//   try {
//     await MyProducts.deleteOne({ _id: productId });
//     res.status(200).send({ 'Product Deleted': productId });
//     } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: err });
//   }
// });

//**************** */
//OK 12.DELETE REVIEW BY REVIEW ID = DONE, using async/await/try/catch per PE
// router.delete('/myProducts/reviews/:review', async (req, res) => {
//   const { reviewId } = req.body; // I sent as query, need to understand sending in body: (assuming you're sending this data in your request...)

//   try {
//     await Review.deleteOne({ _id: reviewId });
//     res.status(200).send({ 'Review Deleted': reviewId });
//     } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: err });
//   }
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

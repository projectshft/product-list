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
// const newProduct = new MyProducts({     //id = 63c866dd3d0fb78401025d7e
//   category: 'Health',
//   name: 'Cool Purple Medicine Ball',
//   price: 25,
//   image: 'https://via.placeholder.com/250?text=Product+Image',
//   reviews: [],
// })
// console.log('newProductId ' + newProduct._id);

// //4. CREATE REVIEW FOR PRODUCT CREATED = DONE - (newProductReview.product matches newProduct._id)
// const newProductReview = new Review({         //id = 63c866dd3d0fb78401025d7f
//   userName: 'Jillannette',
//   reviewText: 'Awesome product for the price!',
//   product: newProduct._id
// })
// newProductReview.save();
// // console.log('newProductReview.product ' + newProductReview.product);
// // console.log('newProduct.reviews ' + newProduct.reviews)
// //5. PUSH REVIEW TO PRODUCT.REVIEWS ARRAY = DONE (newProduct.reviews id is that of newProductReview._id))
// newProduct.reviews.push(newProductReview)
// newProduct.save();

//6. CREATE GET ROUTE FOR PRODUCT BY PRODUCT ID (using path parameter) = DONE
// router.get('/myProducts/:product', (req, res, next) => {
//   MyProducts.findById(req.params.product)
//   .then(result => res.status(200).send(result))
//   .catch(err => res.status(500).send(err));
// })

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

//9. POST ROUTE TO ADD NEW PRODUCT TO DB = DONE
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

//10. CREATE ROUTE TO ADD REVIEW TO PRODUCT BY PRODUCT ID - SUCCESSFUL, NEED TO CLEAN UP
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

//11. DELETE PRODUCT{} BY PRODUCT ID = DONE, 
router.delete('/myProducts/:product', async (req, res, next) => {
  const productToDelete = await MyProducts.findByIdAndDelete(req.query._id)
  .catch(next);
  return res.json(productToDelete)
});

// } catch ((err) {
//   console.error('Error', err)
// } finally {
//   res.end();
//   console.log('product deleted');
// }
// )
//     // console.log('err', err)
//     // console.log('res', res.status)
//     //console.log(data)
//     //if (err) return next (err);
// } 
 
//     if (err) {
//       console.log('err', err)  //console.logs the product object??? status of 200 ok
//       //return next (err) 
//     }
//     res.send(data);
//   })
// method below returned json data in postman, with code above just gave 200 status???
// even when deleting same product, returns res.send 'Yay'.  
//     .then(data => {
//       res.send('Yay!!')
//     })
//     .catch(error => {
//       res.send({error: 'there is a problem'})
//     })
//  });


//12.DELETE REVIEW BY REVIEW ID = DONE, need to understand how to properly handle error and res.send, res.end, etc.
// router.delete('/myProducts/reviews/:reviews', async (req, res) => {   
//   Review.findOneAndDelete({_id: req.query._id}, (err, data) => {
//     if (err) console.log(err)
//     console.log('Successful', data)
//     res.end();
//   })
// });

//13. UPDATE GET/MYPRODUCTS ROUTE TO PASS OPTIONAL QUERY BY RETURN ONLY PRODUCTS OF PASSED IN CATEGORY.
//THIS CODE GETS EMPTY ARRAY;
// router.get('/myProducts/products', (req, res) => {
//   MyProducts.find({ category: req.query.category }, (err, docs) => {
//     if (err) console.log(err)
//     console.log(docs)
//     });
//   });



 
  // router.get('/myProducts', (req, res) => {
//   MyProducts.find({})
//   .then(products => res.json(products));
// });
  //console.log(req.query);

//   .then(result => res.status(200).send(result))
//   .catch(err => res.status(500).send(err));
// })


 

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

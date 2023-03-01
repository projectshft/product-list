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

//COUNT ALL PRODUCTS IN DATABASE 
MyProducts.count({}, ((err, count) => {
  console.log('Num products', count);
}));

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

//2. IMPLEMENT PAGINATION = DONE; FILTER CATEGORY DONE; SORTING DONE; SEARCHING DONE;
router.get("/myProducts", (req, res, next) => {
const perPage = 9;
let pageQuery = req.query.page;     // PAGE NUMBER ENTERED 
//FIGURE OUT HOW TO COUNT PRODUCTS RETURNED AND PRODUCE ERROR IF PAGE SELECTION DOES NOT EXIST
if (!pageQuery) {
  pageQuery = 1;
};
   
  //POSSIBLE SOLUTION FOR CREATING AN ERROR IF A PAGE IS ENTERED THAT CONTAINS NO ITEMS
  //   let newPageStartingItemNo = (perPage * query.pageQuery - perPage)
  //     if (newPageStartingItemNo > count) {
  //       console.log('There are no additional items to display')
  //     }
  //     console.log('87', newPageStartingItemNo)
  // }
  
    
//DECLARE VARIABLES FOR REQUESTS
//DETERMINE PRICE SORT AS ASCENDING OR DESCENDING, AND DEFAULT SORT VALUE IF NONE SELECTED;
let priceQuery = req.query.price;
let priceSort;
if (priceQuery === 'Highest') {                                   
    priceQuery = '-1';
    priceSort = {price: -1};
};
if (priceQuery === 'Lowest') {
  priceQuery = '1';
  priceSort = {price: 1};
};

//DECLARE VARIABLE FOR CATEGORY SEARCH
let categoryQuery = req.query.category;
  
//DECLARE VARIABLE FOR PRODUCT SEARCH  
let productQuery = req.query.name;
 
//SET CATEGORY SEARCH AND SORTING - RETURNS NO DATA IF PAGE SELECTION EXCEEDS #ITEMS RETURNED 
//DEFAULT SORT IF NONE SELECTED IS DESCENDING; DEFAULT PAGE IS 1 IF NONE SELECTED;
if(categoryQuery) {
  console.log('Category fetch***************************************', req.query)
  MyProducts.find({category: categoryQuery})        
 .sort(priceSort)                                                          
 .skip(perPage * pageQuery - perPage)                                      
 .limit(perPage)
 .exec((err, data) => {
  if (err) return next (err)
  console.log('The category you searched for was not found!')
  res.json(data);   //CHANGED FROM CONSOLE.LOG TO RES.JSON 
  })
};

//SET PRODUCT SEARCH AND SORTING - MATCH SEARCH WORD TO PRODUCTS CONTAINING WORD IN NAME
//RETURNS NO DATA IF PAGE SELECTION EXCEEDS #ITEMS RETURNED 
//DEFAULT SORT IF NONE SELECTED IS DESCENDING; DEFAULT PAGE IS 1 IF NONE SELECTED;
if(productQuery) {     
  console.log('Product name fetch****************************', req.query)         
  MyProducts.find({name: { '$regex': productQuery, '$options': 'i' }})        
 .sort(priceSort)                                                          
 .skip(perPage * pageQuery - perPage)                                      
 .limit(perPage)
 .exec((err, data) => {
  if (err) return next (err);
  console.log('The product you searched for was not found in the database!')
  res.json(data)
 })
};



//SET DEFAULT SEARCH IF NO QUERY PARAMETERS.  
//STARTS AT PAGE 1 IF NO PAGE SELECTION;
if(!productQuery && !categoryQuery) {
  console.log('Default product fetch*******************************', req.query)
  MyProducts.find({})        
  .sort(priceSort)                                                         
  .skip(perPage * pageQuery - perPage)                                      
  .limit(perPage)
  .exec((err, data) => {
   if (err) return next (err);
   res.json(data)
   })
  }

//***************** */
//3. CREATE NEW PRODUCT = DONE 
//TRY TO REWRITE WITH PROPER CODE:
//*******MyProducts.create({ props  })***********;

const newProduct = new MyProducts({     //id = 63feb1102781557679a51d69
  category: 'Health',
  name: 'Cool Purple Medicine Ball',
  price: 25,
  image: 'https://via.placeholder.com/250?text=Product+Image',
  reviews: [],
});
  //newProduct.save();

//console.log('newProductId ' + newProduct._id);

// //4. CREATE REVIEW FOR PRODUCT CREATED = DONE - (newProductReview.product matches newProduct._id)
//TRY TO REWRITE WITH PROPER CODE:
//*******Review.create({ props  })*************;
const newProductReview = new Review({         //id = 63feb1102781557679a51d6a
  userName: 'Jillannette',
  reviewText: 'Awesome product for the price!',
  product: newProduct._id
})
//newProductReview.save();
// console.log('newProductReview.product ' + newProductReview.product);
// console.log('newProduct.reviews ' + newProduct.reviews)

//**************** */
// //5. PUSH REVIEW TO PRODUCT.REVIEWS ARRAY = DONE (newProduct.reviews id is that of newProductReview._id))
// newProduct.reviews.push(newProductReview)
// newProduct.save();

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
//7. CREATE GET ROUTE FOR REVIEWS BY PRODUCT ID using path parameter, limited to 4 reviews = DONE **REFACTOR
//PASS PAGE QUERY PARAMETER TO PAGINATE 
// router.get('/myProducts/:product/reviews', (req, res, next) => {
//   const perProduct = 4;
//   //const page = req.query.page || 1;     
//   MyProducts.findById({ _id: req.query.product  })         ****:PRODUCT IS USUALLY REQ.PARAMS
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
})
module.exports = router;
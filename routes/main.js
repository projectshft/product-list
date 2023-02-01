const router = require("express").Router();
const {faker} = require("@faker-js/faker");

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MyProductsSchema = new Schema({
  category: String,                          //TRY fpr category amd name: {type: String, get: capitalizeFirstLetter}, with capitalizeFirstLetter function below
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
// }});

//2. IMPLEMENT PAGINATION = DONE, ***WORKING ON OPTIONAL QUERIES***
router.get("/myProducts", (req, res, next) => {
const perPage = 9;
let pageQuery = req.query.page;     // PAGE NUMBER ENTERED 
if (pageQuery) {
  pageQuery;
}
console.log(pageQuery)

if (!pageQuery) {
  pageQuery || 1;
}
console.log(pageQuery)
    
  //POSSIBLE SOLUTION FOR CREATING AN ERROR IF A PAGE IS ENTERED THAT CONTAINS NO ITEMS
  //   let newPageStartingItemNo = (perPage * query.pageQuery - perPage)
  //     if (newPageStartingItemNo > count) {
  //       console.log('There are no additional items to display')
  //     }
  //     console.log('87', newPageStartingItemNo)
  // }
  
    
  //DECLARE VARIABLES FOR REQUESTS


  

  //RETURN PRODUCTS THAT INCLUDE SEARCH TERMS IN THEIR NAME  
//  let productQuery = req.query.name;
//  let productName;
//   if (productQuery) {
//     productFindproductQuery = { '$regex': productQuery, '$options': 'i' }
//   }
//   console.log('productQuery', productQuery)

 
  //NOT REQUIRED BUT MAY KEEP IN ANYWAY
  // if (pageQuery) {
  //   MyProducts.find({page: query.pageQuery, product: {}})
  //   .skip(perPage * query.pageQuery - perPage)
  //   .limit(perPage)
  //   .exec((err, data) => {
  //     if (err) return next (err);
           
  //     console.log('unfiltered', data)
  //   })
  // }

;    //RAW DATA

  
  //console.log('starting optional',optionalQuery);           //shows literally what is typed into postman;
   //SORT PRODUCT PRICE HIGHEST TO LOWEST BY QUERY VALUE  let priceQuery = optionalQuery.price;
  let priceQuery = req.query.price;
  console.log('starting price',priceQuery)
  let priceSort;
  let priceVal;
  if (priceQuery === 'highest') {                                   
    priceQuery = '-1';
    priceSort = {price: -1};
    priceVal = '-1';
  }
  
  if (priceQuery === 'lowest') {
    priceQuery = '1';
    priceSort = {price: 1};
    priceVal = '1';
  }
  if (!priceQuery) {
    priceQuery = '-1';
    priceSort = {price: -1}
    priceVal = '-1';
  };
  console.log('ending price', req.priceQuery)

 
  let categoryQuery = req.query.category;
  
 
  
  let productQuery = req.query.name;
  // if (productQuery) {
  //   productQuery = {name: { '$regex': productQuery, '$options': 'i' }}
  // }
  // console.log(productQuery)
   



    
    
  // }))
  
  
 //console.log('ending', productQuery)
  //console.log('any', anyQuery)
  // optionalQuery = {page: pageQuery, category: categoryQuery, price: priceQuery, name: productQuery}
  //console.log('opt', optionalQuery)
  // if (optionalQuery) {
  //   optionalQuery = {page: pageQuery, category: categoryQuery, price: priceQuery, name: productQuery}
  //   console.log('transformed', optionalQuery)
  // }
  // if (anyQuery) {
  //   anyQuery = {page: pageQuery, category: categoryQuery, price: priceVal, name: { '$regex': productQuery, '$options': 'i' }}
  // }
  // console.log('transformed any', anyQuery)
 

  //console.log('priceQuery, priceSort, priceVal',priceQuery, priceSort, priceVal)

  //console.log('priceVal',priceVal)       //THIS WORKS
// let query = {};
// if (productQuery) {
//   query.productQuery = productQuery;
//   console.log(query.productQuery)
// }

// if (categoryQuery) {
//   query.categoryQuery = categoryQuery;
//   console.log(query.categoryQuery)
// }
if(categoryQuery) {
  MyProducts.find({category: categoryQuery})        //this works          //CAN'T GET PRODUCTS;  //CAN GET COUNT BUT NOT TOGETHER WITH RESPONSE
 .sort(priceSort)                                                          //SORTS ACCURATELY WITH OR WITHOUT PRICE
 .skip(perPage * pageQuery - perPage)                                      //PAGE 1 WITH OR WITHOUT QUERY, NO DATA RETURNED IF PAGE 2
 .limit(perPage)
 .exec((err, data) => {
  if (err) return next (err);
  console.log(data)
  
 });
 
}
if(productQuery) {               //this works 
  MyProducts.find({name: { '$regex': productQuery, '$options': 'i' }})        //this works          //CAN'T GET PRODUCTS;  //CAN GET COUNT BUT NOT TOGETHER WITH RESPONSE
 .sort(priceSort)                                                          //SORTS ACCURATELY WITH OR WITHOUT PRICE
 .skip(perPage * pageQuery - perPage)                                      //PAGE 1 WITH OR WITHOUT QUERY, NO DATA RETURNED IF PAGE 2
 .limit(perPage)
 .exec((err, data) => {
  if (err) return next (err);
  console.log(data)
 });


}
if(!productQuery && !categoryQuery) {
  MyProducts.find({})        //this works          //CAN'T GET PRODUCTS;  //CAN GET COUNT BUT NOT TOGETHER WITH RESPONSE
  .sort(priceSort)                                                          //SORTS ACCURATELY WITH OR WITHOUT PRICE
  .skip(perPage * pageQuery - perPage)                                      //PAGE 1 WITH OR WITHOUT QUERY, NO DATA RETURNED IF PAGE 2
  .limit(perPage)
  .exec((err, data) => {
   if (err) return next (err);
   console.log(data)
  });
 
 
 }

 
//  })
 

//EXP e1 - PAGE 1, HEALTH ONLY     // RETURNS HEALTH DECREASING VALUE, PG 1
//EXP 2 - HEALTH ONLY              //RETURNS HEALTH DECREASING VALUE NO PAGE CONSOLE.LOGGED;  
//exp 3 - page 2, health           //no return which is good, no page 2
//exp 4 - page 1, product          // returns sausages in desc order
//exp 5 - no page, product          // returns sausages in desc order
//exp 6 - category and product      // returns health and sausages  in desc order respectively 
//exp 7 - if nothing               //returns all products in desc order 
//exp 8 - if page 3, 4, etc        // returns all products appropriate page 
//exp 9 - if price lowest          // returns all products asc order 
  
  

   //
     //THIS WORKS AND SORTS ACCURATELY
    //  MyProducts.find({page: pageQuery, category: categoryQuery, name: productName})
    //  .sort(priceSort)
    //  .skip(perPage * pageQuery - perPage)
    //  .limit(perPage)
    //  .exec((err, data) => {
    //    if (err) return next (err);
            
    //          console.log('filtered', data);
             
    //    });
      
      //}

  
  
      
  // } else if (!optionalQuery) {
  //   MyProducts.find({})  
  //   .skip(perPage * query.pageQuery - perPage)
  //   .limit(perPage)
  //   .exec((err, data) => {
  //     if (err) return next (err);
           
  //     console.log('unfiltered', data)
  //   })
  // }   
 

 //******START HERE - NEED TO PRODUCE ERROR IF PAGE DOES NOT YEILD ANY PRODUCTS, BUT STRUGGLING TO GET THIS TO WORK */

 
// MyProducts.count(query)
// .exec((err, count) => {
//   if (err) console.log(err);
//   console.log('numItems', count)
// })





// MyProducts.count().exec((err, count) => {
//   if (err) console.log(err);
//   console.log('totalNumProducts',count)
// })



  


 


//   const pageCategoryQuery = pageQuery && categoryQuery;
//   if (pageCategoryQuery) {
//     MyProducts.find({page: pageQuery, category: categoryQuery})
//       .exec((err, data) => {
//         if (err) return next (err);
//         console.log('filtered', data);
//   });
// }

});
// //   //NEEDS WORK // SEE COMMENTS //const pagePriceQuery = pageQuery && priceQuery;          //NOT WORKING BECAUSE NEEDS TO RETURN ALL PRODUCTS!!!!! 

// //   //IF OPTIONAL QUERIES = PAGE AND PRODUCT:  (DONE)
// const pageProductQuery = pageQuery && productQuery;
//   if (pageProductQuery) {
//     MyProducts.find({page: pageQuery, name: { '$regex': productQuery, '$options': 'i' }})
//       .exec((err, data) => {
//         if (err) return next (err);
//         console.log('filtered', data);
//       })
//   }

//   //IF OPTIONAL QUERIES = PAGE, CATEGORY AND PRICE:
//   const pageCategoryPriceQuery = pageQuery && categoryQuery && priceQuery;
//   if (pageCategoryPriceQuery) {
//     MyProducts.find({page: pageQuery, category: categoryQuery, priceSort})
//       .sort(priceSort)
//       .select(['-category'])
//       .exec((err, data) => {
//         if (err) return next (err);
//         console.log('filtered', data);
//       })
//   }

//   //const pageCategoryProductQuery = pageQuery && categoryQuery && productQuery;
//   //const pageCategoryPriceProductQuery = pageQuery && categoryQuery && priceQuery && productQuery;

//   //const pagePriceProductQuery = pageQuery && priceQuery && productQuery;






//     } else {
//     MyProducts.find({})  
//     .skip(perPage * pageQuery - perPage)
//     .limit(perPage)
//     .exec((err, data) => {
//       if (err) return next (err);
           
//       console.log('unfiltered', data)
//     })node
 
// }




//***SET OPTIONAL QUERY FOR PRODUCT AND ERROR IF NOTHING MATCHES  */
  
//Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back 
//so we can figure out the number of pages

  //});

//WORKING EXAMPLE ONLY 
// MyProducts.find({'category': 'Shoes' }, (err, data) => {
//   if (err) console.log(err);
//   console.log(data)
// })

//***************** */
//3. CREATE NEW PRODUCT = DONE 
//TRY TO REWRITE WITH PROPER CODE:
//*******MyProducts.create({ props  })***********;

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
//TRY TO REWRITE WITH PROPER CODE:
//*******Review.create({ props  })*************;
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

module.exports = router;
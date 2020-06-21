// we'll want to import our model and add some routes for filling our database with fake data.

const router = require('express').Router()
// this is a package that will help us populate our database with a bunch of fake data.
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')


// Now if you fire up your server and make a GET request to localhost:8000/generate-fake-data, it will create and save 90 new products each time you do. You might only want to do this once or twice.
// Now check your database to see a products collection with all your data.
// router.get('/generate-fake-data', (req, res, next) => {
//   const adjectiveArray = ['great', 'awesome', 'awful', 'weird', 'useless'];


//   for (let i = 0; i < 90; i++) {
//     let product = new Product();
//     let randomNumOfReviews = Math.floor(Math.random() * 10);
//     const getReviews = (randomNumOfReviews, productName) => {
//       let reviews = [];

//       for (let j = 0; j < randomNumOfReviews; j++) {
//         //let review = new Review();
//         let randomNumOfAdjectiveArray = Math.floor(Math.random() * 5);
//         reviews.push({
//           userName: faker.name.findName(),
//           text: `This ${productName} is ${adjectiveArray[randomNumOfAdjectiveArray]}`
//         })
//       }
//       return reviews;
//     }
//     product.category = faker.commerce.department()
//     product.name = faker.commerce.productName()
//     product.price = faker.commerce.price()
//     product.image = 'https://via.placeholder.com/250?text=Product+Image'
//     product.reviews = getReviews(randomNumOfReviews, product.name)


//     product.save((err) => {
//       if (err) throw err
//     })
//   }
//   res.end()
// })

// Next we'll create our paginating GET route. We'll want the client to be able to pass in any "page" they want to get a different set of products each time and limit them to only 10 products at one time. 
router.get('/products', (req, res, next) => {

  //set max products per page to 9
  const perPage = 9

  // return the first page by default
  const page = req.query.page || 1;


   // get optional query parameter from request to find by product category
   const categoryType = req.query.category || null;
    console.log('category: ', categoryType)
   // get optional query parameter from request to sort the products by price (ascending or descending)
   const priceSortType = req.query.price || null;
 
   // get optional query search string from request to search products by their name and category
   const search = req.query.search || null;
    console.log('search: ', search)


  const regex = new RegExp(search);

    // this function will be called when we're building up our query below
  // check that this is not defaulting to highest if no param is given
  const getSortType = priceSortType => {
    if (priceSortType == "Highest") {
      return 1;
    } else  {
      return -1;
    } 
  }
 
var query = {};
if (categoryType) {
  query.category = categoryType;
}
if (search) {
  query.name = regex;
}
// if (priceSortType) {
//   query.sort.price = getSortType(priceSortType);
// }  
 






  
    Product
      .find(query)
      //.skip((perPage * page) - perPage)
     // .limit(perPage)
      .sort({ price: getSortType(priceSortType) })
      .exec((err, products) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
        console.log('Number of found products: ', products.length)
        //res.append('Total products found', products.length.toString());
        res.append('productCount', products.length.toString());
        res.send(products);
        // Product.count().exec((err, count) => {
        //   if (err) return next(err)
  
          
        // })
      })
  })
 // Product
    //.find({ $and: [{ category: categoryType }, {$match: { $or:[ {name: { $regex: searchQuery}}, { category: { $regex: searchQuery}}]}} ]})
    // .find({ $or: [{ name: { $regex: searchQuery, $options: "i"}}, 
    //              
    //               { category: categoryType}, 
    //               {}]} )
  //  .find({queryOptions})
   // .find({ $or: [ { category: category }, { name: { $regex: search, $options: "i"}}, { category: { $regex: search, $options: "i"}}]}) 
    // .find({ category: categoryType})
    // .count({ category: categoryType}, function (err, count) {
    //   res.append("productCount", count.toString())
    // })             
    //.sort({ price: getSortType(priceSortType) })
    //.skip((perPage * page) - perPage)
    //.limit(perPage)
    // .exec((err, products) => {
    //   console.log('products count: ', products)
    //   // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
    //   // If you want to count all documents in a large collection, use the estimatedDocumentCount() function instead. If you call countDocuments({}), MongoDB will always execute a full collection scan and not use any indexes.
      
    //   Product.countDocuments().exec((err, count) => {
    //     if (err) return next(err)
    //     res.send(products)
    //     //console.log('Count inside product.count= ', products.length)

        //we'll try sending the product count back as a response header (using append) and then pulling that out for the pagination component
        //res.append("productCount", products.length.toString())
        //res.append("productCount", count.toString())
        
//       })
//     })
// })



/*
GET /products/:product: Returns a specific product by its id
*/
router.get('/products/:productId', (req, res, next) => {
  //get the productId from the request
  const productId = req.params.productId;

  //find the product by the productId provided in the request parameter
  Product
    .find({ _id: productId })
    .exec((err, foundProduct) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Product.count().exec((err, count) => {
        if (err) return next(err)

        res.send(foundProduct)
      })
    })
})


/*
GET /products/:product/reviews: Returns ALL the reviews for a product (by productId in url), but limited to 4 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an optional page query parameter to paginate.

Still need to work on how to count the reviews and paginate them to 4 per page

Is an empty array sent back if there are no reviews?
*/
router.get('/products/:productId/reviews', (req, res, next) => {
  //gets the productId from the request
  const productId = req.params.productId;

  //limits the reviews to 4 per page
  const reviewsPerPage = 4


  // returns the first page of reviews by default, if user doesn't specify a page in the query
  const page = req.query.page || 1

  // this will search the products collection by product id and return the reviews for that product in an array
  Product
    .find({ _id: productId })
    .skip((reviewsPerPage * page) - reviewsPerPage)
    .limit(reviewsPerPage)
    .exec((err, foundProduct) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Product.count().exec((err, count) => {
        if (err) return next(err)

        res.send(foundProduct[0].reviews)
      })
    })
})

/*
POST /products: Creates a new product in the database (right now with randomly generated properties and an empty reviews array)
*/
router.post('/products', (req, res, next) => {

  let product = new Product();

  product.category = faker.commerce.department()
  product.name = faker.commerce.productName()
  product.price = faker.commerce.price()
  product.image = 'https://via.placeholder.com/250?text=Product+Image'
  product.reviews = []


  product.save((err) => {
    if (err) throw err
  })

  res.end()
})



/*
POST /products/:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.
*/
router.post('/products/:productId/reviews', (req, res, next) => {
  //gets the productId, review username and review text from the request
  const productId = req.params.productId;
  const reviewUserName = req.body.username;
  const reviewText = req.body.text;
  const newReview = {
    userName: reviewUserName,
    text: reviewText
  }


  // this will search the products collection by product id so that we can add the new review to it
  // $addToSet will add a review to the reviews array, and setting new:true will return the updated record
  // GO BACK AND CHANGE THIS TO $PUSH
  Product
    .findByIdAndUpdate(productId, { $addToSet: { reviews: newReview } }, { new: true })
    .exec((err, product) => {
      if (err) throw err;
      res.send(product)
    })
  // .then((docs) => {
  //   if (docs) {
  //     resolve({ success: true, data: docs });
  //   } else {
  //     reject({ success: false, data: "no such product exists" });
  //   }
  // }).catch((err) => {
  //   reject(err);
  // })

  // res.send()
})

/*
DELETE /products/:product: Deletes a product by id
*/
router.delete('/products/:productId', (req, res, next) => {
  productIdToDelete = req.params.productId;
  Product.findByIdAndDelete(productIdToDelete, function (err) {
    if (err) console.log(err);
    console.log("Successful deletion");
  });

  res.end()
})


/*
DELETE /reviews/:review: Deletes a review by id
*/
router.delete('/reviews/:reviewId', (req, res, next) => {
  const productId = req.body.productId
  const reviewIdToDelete = req.params.reviewId;
  Product.findByIdAndUpdate(productId, { $pull: { reviews: { _id: reviewIdToDelete } } })
    .exec((err, product) => {
      if (err) throw err;

    })

  res.end()
})

module.exports = router




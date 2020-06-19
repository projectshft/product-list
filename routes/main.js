// we'll want to import our model and add some routes for filling our database with fake data.

const router = require('express').Router()
// this is a package that will help us populate our database with a bunch of fake data.
const faker = require('faker')
const Product = require('../models/product')
//const Review = require('../models/review')


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
  const perPage = 9

  // return the first page by default
  const page = req.query.page || 1

  Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      // If you want to count all documents in a large collection, use the estimatedDocumentCount() function instead. If you call countDocuments({}), MongoDB will always execute a full collection scan and not use any indexes.
      Product.count().exec((err, count) => {
        if (err) return next(err)

        res.send(products)
      })
    })
})



/*
GET /products/:product: Returns a specific product by its id
*/
router.get('/products/:productId', (req, res, next) => {
  //get the productId from the request
  const productId = req.params.productId;

  //find the product by the productId provided in the request parameter
  Product
    .find({_id: productId})
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
*/
router.get('/products/:productId/reviews', (req, res, next) => {
  //get the productId from the request
  const productId = req.params.productId;
  
  //limit the reviews to 4 per page
  const reviewsPerPage = 4
  

  // return the first page by default, if user doesn't specify a page in the query
  const page = req.query.page || 1

  //right now we're returning the whole product, we need to get just the reviews out of the product, so do we search the product collection and get the reviews array or do we search the reviews collection by the product id. I feel like it should be the former. 
  Product
    .find({_id: productId})
    .skip((reviewsPerPage * page) - reviewsPerPage)
    .limit(reviewsPerPage)
    .exec((err, product) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Product.count().exec((err, count) => {
        if (err) return next(err)

        res.send(product.reviews)
      })
    })
})

/*
POST /products: Creates a new product in the database
*/

/*
POST /products/:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.
*/

/*
DELETE /products/:product: Deletes a product by id
*/

/*
DELETE /reviews/:review: Deletes a review by id
*/

module.exports = router




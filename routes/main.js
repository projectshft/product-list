const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')


// Endpoint to GET fake data to fill our database
router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) { 
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    product.reviews = []

    // console.log('PRODUCT IS: ',product)

      // Generate a random number of reviews between 0 - 4
      function getRandomInt(x){
        return Math.floor(Math.random() * Math.floor(x));
      }
      let randomNum = getRandomInt(4);
      // console.log('RANDOM NUMBER IS: ',randomNum)

      // For each random number, generate a review
      for (let i = 0; i < randomNum; i++) {

        let review = new Review()

          review.product = product._id,
          review.userName = faker.internet.userName()
          review.text = faker.lorem.sentence()  

          // console.log('REVIEW IS: ',review)

          review.save((err) => {
            if (err) throw err
          })

          product.reviews.push(review);
      }
          product.save((err) => {
            if (err) throw err
          })
  }
 
  res.end()
})

// Endpoint to GET products with query
router.get('/products', (req, res, next) => {

    const perPage = 9

      console.log('QUERY OBJECT: ', req.query)

       // return the first page by default
      const page = req.query.page 
       console.log('PAGE PARAM IS: ', page)

      const category = req.query.category
        console.log('CATEGORY QUERY IS: ', category)

      const price = req.query.price
        console.log('PRICE PARAM IS: ', price)

      const filter = {} //How does it speak to state from Redux?
      if (category) {
        filter.category = category;
        // filter.price = price;
      }

  
      // instances of the Product model from ProductSchema
      Product
      .find(filter)
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, products) => {
        Product.countDocuments().exec((err, count) => { //Docs to see how to pass in filter to countDocuments
          if (err) return next(err)
           console.log( "Number of products:", count );

          res.send({products, count })
          
        })
      })

/********************************************************
 *  LOGIC FOR OPTIONAL QUERIES (STILL WORKING ON IT...)
 ********************************************************
    // If a category query is passed in in URL
    if (req.query.category) {

      let category = req.query.category
      console.log('CATEGORY QUERY IS: ', category)

      Product
      .find({category:category})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, products) => {
        Product.countDocuments().exec((err, count) => {
          if (err) return next(err)
           console.log( "Number of products:", count );
          res.send(products)      
        })
      })
    }

    // If a price sort query is passed in in URL
    // sort by "price" ascending or descending
    if (req.query.price) {

        let price = req.query.price
        console.log('PRICE QUERY IS: ', price)

        Product
           .find({})
           // .sort({ price: 'asc'})
           .sort({ price: price})
           .skip((perPage * page) - perPage)
           .limit(perPage)
           .exec((err, products) => {
             Product.countDocuments().exec((err, count) => {
               if (err) return next(err)
                console.log( "Number of products:", count );
               res.send(products)      
             })
        })   
    }

    // Return all products
    else {
 
    }
*/ 

  })

  module.exports = router


// Additional Endpoints to complete per assignment requirements

    // Note: routes folder > products.js, reviews.js [beers.js]

// GET /products/:product: Returns a specific product by its id

// POST /products: Creates a new product in the database

// POST /:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.

// DELETE /products/:product: Deletes a product by id


// GET /reviews: Returns ALL the reviews, but limited to 40 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an options page query to paginate.

// DELETE /reviews/:review: Deletes a review by id





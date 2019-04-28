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
      product.image = 'http://localhost:3000/ugly_product.jpg'
      product.reviews = []

      // Random number generator (0-4)
      function getRandomInt(x){
        return Math.floor(Math.random() * Math.floor(x));
      }
        let randomNum = getRandomInt(4);


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

      const page = req.query.page 
       console.log('PAGE QUERY IS: ', page)

      const category = req.query.category
        console.log('CATEGORY QUERY IS: ', category)

      const price = req.query.price
        console.log('PRICE QUERY IS: ', price)

    const filter = {} 
      if (category) {
        filter.category = category;
      }

      // const sort = {}
      // // if (price) {
      //   sort.price = price;
      // }

  
      // instances of the Product model from ProductSchema
      Product
      .find(filter)
      .skip((perPage * page) - perPage)
      .limit(perPage)
      // .sort(sort)
      .exec((err, products) => {
        Product.countDocuments().exec((err, count) => { //Docs to see how to pass in filter to countDocuments
          if (err) return next(err)
           console.log( "Number of products:", count );

          res.send({ products, count })
          
        })
      })

  })


// POST /products: Creates a new product in the database
router.post('/products', (req, res, next) => {

    // create instance of a Product model
    const newProduct = new Product({
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      reviews: []
    })
    
    newProduct.save((err) => {
      if (err) throw err
    })
    res.send(`Product entry success! ${newProduct}`)
});


// GET /products/:product: Returns a specific product by its id
router.get('/products/:productId', (req, res, next) => {

    const productId = req.params.productId

      Product
      .findById(productId)
      .exec((err, product) => {

        res.send(product);
      })
  });


// DELETE /products/:product: Deletes a product by id
router.delete('/products/:productId', (req, res, next) => {

  const productId = req.params.productId

  Product
  .findById(productId)
  .exec((err, product) => {
    product.remove()
    res.send(`Product deletion success!`);
  })
});


// POST /:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.
router.post('/:productId/reviews', (req, res, next) => {

  const productId = req.params.productId

  Product
    .findById(productId)
    .exec((err, product) => {

      // create instance of a Review model
      const newReview = new Review ({
        product: req.params.productId,
        userName: req.body.userName,
        text: req.body.text
      })

      newReview.save((err) => {
        if (err) throw err
      })
      product.reviews.push(newReview)
      product.save()

      res.send(`Review entry success! ${newReview}`)
    })
});

// DELETE /reviews/:review: Deletes a review by id
router.delete('/reviews/:reviewId', (req, res, next) => {

  const reviewId = req.params.reviewId

  Review
  .findById(reviewId)
  .exec((err, review) => {
    review.remove();
    res.send(`Review deletion success! ${req.params.reviewId}`);
  })
});


// GET /reviews: Returns ALL the reviews, paginate through 40 at a time. 
router.get('/reviews', (req, res, next) => {

    const perPage = 40
    const page = req.query.page || 1

    Review
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      if (err) return next(err)
           console.log(err);

      res.send(reviews)
    });
});

module.exports = router


const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

// GET /generate-fake-data --- generates products and reviews  
router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {

    let product = new Product()

    for (let i = 0; i < 3; i++) {
      let review = new Review() 
      review.userName = faker.internet.userName() 
      review.text = faker.commerce.productAdjective() + '!'
      review.product = product._id

      review.save((err) => {
        if (err) throw err
      })
      product.reviews.push(review)
    }

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

// GET /products --- returns all products (paginated)
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
      Product.count().exec((err, count) => {
        if (err) return next(err)

        res.send(products)
      })
    })
})

// GET /products/:product --- returns a specific product by its id
router.get('/products/:productId', (req, res, next) => {
  const { productId } = req.params 
  Product.find({ _id : productId}, (err, product) => {
    if (err) return next(err)
    res.send(product)
  })
})

//GET /reviews --- returns all reviews (paginated)
router.get('/reviews', (req, res, next) => {
  const perPage = 40
  // return the first page by default
  const page = req.query.page || 1

  Review
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Review.count().exec((err, count) => {
        if (err) return next(err)
        res.send(reviews)
      })
    })
})

// POST /products --- creates a new product in the database
router.post('/products', (req, res, next) => {
  console.log(req.body)

  let product = new Product()
  product.category = req.body.category
  product.name = req.body.name
  product.price = req.body.price
  product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

  product.save((err) => {
    if (err) throw err
  })
  res.send(product) 
})

// POST /:product/reviews: Creates a new review in the database 
// by adding it to the correct product's reviews array.

module.exports = router
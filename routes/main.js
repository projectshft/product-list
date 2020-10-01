const router = require('express').Router()
// const bodyParser = require('body-parser')
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://via.placeholder.com/250?text=Product+Image'

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

// get all products, ?page= for starting page
  // 2) ?/&category= option
    // 3) sort by ?/&price=highest/lowest
      // 4) ?/&query= search results product name, make case insensitive if possible
// count of products returned needs to dynamically reflect results
router.get('/products', (req, res, next) => {
  const perPage = 10

  // return the first page by default
  const page = req.query.page || 1

  Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort({_id : 'asc'})
    .exec((err, products) => {
      // counting all for future use?
      Product.countDocuments().exec((err, count) => {
        if (err) return next(err)

        res.send(products)
      })
    })
})
// returns specific product by id
router.get('/products/:product', (req, res, next) => {
  console.log(`param ${req.params.product}`)
  if (err) return next(err)
  res.send(req.params.product)
})

// returns all reviews of a product, limited to 4 @ time, ?page= option to start page
router.get('/products/:product/reviews', (req, res, next) => {
  if (err) return next(err)
  res.send(/*response*/)
})

// creates a new product in the database
router.post('/products', (req, res, next) => {
  if (err) return next(err)
  res.send(/*response*/)
})

// creates a new review in the database by adding to array
router.post('/:product/reviews', (req, res, next) => {
  if (err) return next(err)
  res.send(/*response*/)
})

// deletes a product by id
router.delete('/products/:product', (req, res, next) => {
  if (err) return next(err)
  res.send(/*response*/)
})

// deletes a review by id
router.delete('/reviews/:review', (req, res, next) => {
  if (err) return next(err)
  res.send(/*response*/)
})
module.exports = router


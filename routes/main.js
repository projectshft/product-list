const router = require('express').Router()
const faker = require('faker')
const { Product } = require('../models/product')

router.param('product', function(req, res, next, id) {
  req.product = Product.findOne({ _id: id })
  next()
})

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    product.reviews = []; // Add in reviews array

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

router.get('/products', (req, res, next) => {
  let numberOfProductsToSkip = 0;
  if (req.query.page && req.query.page > 0) {
    numberOfProductsToSkip = (req.query.page - 1) * 10
  }
  Product.find({})
    .skip(numberOfProductsToSkip)
    .limit(10)
    .exec( (error, products) => {
      res.send(products)
    })
})

router.post('/products', (req, res, next) => {
  // req.body.category = 
  // req.body.name = 
  // req.body.price = req.body.price || 0
  // req.body.image = req.body.image || 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
  // req.body.reviews = [];
  Product.create({
    category: req.body.category || 'Uncategorized',
    name: req.body.name || 'New Product',
    price: req.body.price || 0,
    image: req.body.image || 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png',
    reviews: []
  }, (err, data) => {
    if (err) {
      return console.error(err)
    }
    console.log(data)
  })
  res.end()
})

router.get('/products/:product', (req, res, next) => {
  res.send(req.product)
})

router.get('/reviews', (req, res, next) => {
  let reviewsPerPage = 40
  let pageNumber = req.query.page || 0
  if (pageNumber > 0) {
    numberOfReviewsToSkip = (req.query.page - 1) * reviewsPerPage;
  }
  Product.find({})
    .skip(numberOfReviewsToSkip)
    .limit(reviewsPerPage)
    .exec( (error, products) => {
      res.send(products)
    })
})

module.exports = router
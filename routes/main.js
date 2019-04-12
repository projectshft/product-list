const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image =
      'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

    product.save(err => {
      if (err) throw err
    })
  }
  res.end()
})

router.get('/products', (req, res, next) => {
  const perPage = 9

  // return the first page by default
  const page = req.query.page || 1

  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Product.estimatedDocumentCount().exec((err, count) => {
        if (err) return next(err)

        res.send(products)
      })
    })
})

router.param('product', function(req, res, next, id) {
  Product.findById(id)
    .populate({ path: 'reviews' })
    .exec((err, product) => {
      if (err) {
        console.error(err)
      } else {
        req.product = product
      }
      next()
    })
})

router.get('/products/:product', (req, res) => {
  res.send(req.product)
})
module.exports = router

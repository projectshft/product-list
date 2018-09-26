const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

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

router.get('/products', (req, res, next) => {
    const pageLimit = 9
    const page = req.query.page || 1;

    Product
      .find({})
      .skip((pageLimit * page) - perPage)
      .limit(pageLimit)
      .exec((err, products) => {
        Product.count().exec((err, count) => {
          if (err) return next(err)
          res.send(products)
        })
      })
})

router.get('/products/:productId', (req, res, next) => {
  res.send()
  res.end()
})

router.post('/products', (req, res, next) => {
  res.send()
  res.end()
})

router.post('/:productId/reviews', (req, res, next) => {
  res.send()
  res.end()
})

router.delete('/products/:productId', (req, res, next) => {
  res.send()
  res.end()
})

router.delete('/reviews/:reviewId', (req, res, next) => {
  res.send()
  res.end()
})

module.exports = router
const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')

router.get('/products', (req, res, next) => {
  const perPage = 10

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

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://payload.cargocollective.com/1/16/530262/11823255/Itsthevibe---Image-not-found_3984.JPG'

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

module.exports = router
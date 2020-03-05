const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()
    let review = {text: "Beautifully machine-crafted", userName: "Black-Knight"}

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'http://www.beeville.net/fbcsweb/Texas_Outline.jpg'
    product.reviews = [review]

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

router.get('/products', (req, res, next) => {req.query.q
  const queryVal = parseInt(req.query.q) || 0

  Product.find({}).skip(queryVal).limit(9).exec((err, products) => {
    if (err) {res.send(err)}
    else res.json(products)
  })
})

module.exports = router
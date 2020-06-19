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
    product.reviews = [];

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

router.param('product', function(req, res, next, id) {
  req.product = Product.find({_id: id});
  next();
});

router.get('/products', (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1

  Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Product.count().exec((err, count) => {
        if (err) return next(err)

        res.send(products)
      })
    })
})

router.get('/products/:product', (req, res, next) => {
// Using the product params
    req.product.exec((err, product) => {
      Product.count().exec((err, count) => {
        if (err) return next(err)
        res.send(product)
      })
    })
})

router.post('/products', (req, res, next) => {
  let product = new Product();

  product.category = req.body.category; // need edge case
  product.name = req.body.name; // edge case needed
  product.price = req.body.price; // edge case needed
  product.image = req.body.image || 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png';
  product.reviews = req.body.reviews || [];

  product.save((err) => {
    if (err) throw err
  })
  res.send(product);
})

module.exports = router
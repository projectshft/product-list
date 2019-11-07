const router = require('express').Router()
const Product = require('../models/product')
const Review = require('../models/review')

// gets specific product by ID
router.get('products/:product', (req, res, next) => {
  return Product.findById(req.params.id, (err, product) => {
    if (!err) {
      return res.send(product);
    } else {
      return console.log(err);
    }
  })
});

// get ALL products
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
});

// creates new product
router.post('/products', (req, res, next) => {

});

// creates new review for specific product
router.post('/products/:products/reviews', (req, res, next) => {

});

// deletes product by ID
router.delete('/products/:products', (req, res, next) => {

});

module.exports = router
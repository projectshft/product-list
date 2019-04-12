const router = require('express').Router();
const queryString = require('querystring');
const url = require('url');
const Product = require('../models/product');
const Review = require('../models/review');

// Returns all of the product at 9 per page

router.get('/products', (request, response, next) => {
  const perPage = 9;

  // return the first page by default
  const page = request.query.page || 1;

  Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((error, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Product.countDocuments().exec((error, count) => {
        if (error) return next(error)

        response.send(products)
      })
    })
})

// GET a single product based on ID

router.get('/:product', (request, response) => {
  res.send(req.product);
});

module.exports = router;
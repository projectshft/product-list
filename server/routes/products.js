const router = require('express').Router();
const queryString = require('querystring');
const url = require('url');
const Product = require('../models/product');
const Review = require('../models/review');

// Gets the specific product for a supplied ID for any routes that take a specific product ID

router.param('product', (request, response, next, id) => {
  Product.find({ _id: id }, (error, product) => {
    if (error) {
      response.status(404).send('Product was not found');
    }
    request.product = product;
    next();
  });
});

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

// GET This endpoint returns a single product based on supplied ID

router.get('/products/:product', (request, response) => {
  response.send(request.product);
});

// POST This endpoint allows a user to add a new product to the database

router.post('/products', (request, response) => {
  const newProduct = new Product({
    category: request.body.category,
    name: request.body.name,
    price: request.body.price,
    image: request.body.image,
    reviews: []
  });
  newProduct.save();
  response.send(newProduct);
});

module.exports = router;
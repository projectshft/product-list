const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/product');
const Review = require('../models/review');

router.get('/generate-fake-data', (request, response, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png';
    product.reviews = [];

    product.save((error) => {
      if (error) throw error;
    })
  }
  response.end();
})

router.get('/products', (request, response, next) => {
  const perPage = 5;

  // return the first page by default
  const page = request.query.page || 1;

  Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((error, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Product.count().exec((error, count) => {
        if (error) return next(error)

        response.send(products)
      })
    })
})

module.exports = router
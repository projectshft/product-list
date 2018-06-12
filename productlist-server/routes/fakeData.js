const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/product');

// Creates fake data.
// Modified price faker to look more like real prices, instead of whole int.
// Images url taken from picsum.
router.get('/generate-fake-data', (request, response, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.finance.amount(1, 100, 2);
    product.image = `https://picsum.photos/200?image=${i}`;

    product.save((err) => {
      if (err) throw err
    })
  }
  response.end();
})

module.exports = router
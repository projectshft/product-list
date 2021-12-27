const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/product');
const Review = require('../models/review');

// GET/generate-fake-data route - Generate fake products (30 at a time) with 6 reviews each
router.get('/generate-fake-data', (req, res) => {
  for (let i = 0; i < 30; i += 1) {
    const product = new Product();
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = 'https://via.placeholder.com/250?text=Product+Image';
    product.reviews = [];

    for (let j = 0; j < 6; j += 1) {
      const review = new Review();
      review.userName =
        faker.animal.snake().replaceAll(' ', '') + faker.datatype.number(1000);
      review.text = faker.lorem.sentence();
      review.product = product._id;

      review.save((err) => {
        if (err) throw err;
      });

      product.reviews.push(review);
    }

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

module.exports = router;

const router = require('express').Router();
const { faker } = require('@faker-js/faker');
const Product = require('../models/product');
const Review = require('../models/review')

router.get('/products', (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 9;
  Product.find()
    .skip((Number(page) - 1) * 9)
    .limit(Number(limit))
    .exec((error, products) => {
      if (error) throw error;
      res.send(products)
      res.end()
    })
})

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    const product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = 'https://via.placeholder.com/250?text=Product+Image';

    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
      const review = new Review()

      review.username = faker.name.firstName();
      review.text = faker.lorem.sentence();
      review.product = product._id;

      review.save(err => {
        if (err) {
          throw err
        }
      })
      product.reviews.push(review);
    }

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.writeHead(200, 'Fake data generated');
  res.end();
});

module.exports = router;

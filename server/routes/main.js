const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/Product');
const Review = require('../models/Review');

router.get('/', (req, res) => {
  res.redirect('/products');
});

router.get('/generate-fake-data', (req, res, next) => {
  // Create 100 products
  for (let i = 0; i < 100; i++) {
    let product = new Product({
      category: faker.commerce.department(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.cats(),
      reviews: []
    });

    // Get random number of reviews for each product
    const randomInt = Math.floor(Math.random() * 4);

    // Create review(s), save them, and push them into product reviews
    for (let i = 0; i < randomInt; i++) {
      let review = new Review({
        userName: faker.internet.userName(),
        text: faker.lorem.sentences(3),
        product: product
      });
      review.save(err => {
        if (err) throw err;
      });
      product.reviews.push(review);
    }

    // Save the product (including its reviews)
    product.save(err => {
      if (err) throw err;
    });
  }
  res.end();
});

module.exports = router;

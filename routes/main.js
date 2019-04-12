const { Router } = require('express');
const faker = require('faker');
// Bring in models
const { Product } = require('../models/product');
const { Review } = require('../models/review');

const router = Router();

router.get('/generate-fake-data', (req, res) => {
  for (let i = 0; i < 100; i++) {
    const product = new Product({
      category: faker.commerce.department(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image:
        'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png',
      reviews: []
    });

    const review1 = new Review({
      userName: faker.internet.userName(),
      text: faker.lorem.sentence(),
      product: product._id
    });

    const review2 = new Review({
      userName: faker.internet.userName(),
      text: faker.lorem.sentence(),
      product: product._id
    });

    product.reviews.push(review1, review2);

    review1.save();

    review2.save();

    product.save();
  }

  res.send('Items saved.');
});

module.exports = router;

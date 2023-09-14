/* eslint-disable no-plusplus */
const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');
const Product = require('../models/product');
const Review = require('../models/review');

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    const product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = 'https://via.placeholder.com/250?text=Product+Image';
    product.reviews = [];

    const numReviews = Math.floor(Math.random() * 12);

    for (let k = 0; k <= numReviews; k++) {
      const numWords = Math.random() * (10 - 3) + 3;
      const review = new Review();

      review.username = faker.internet.userName();
      review.text = faker.word.words(numWords);
      review.product = product;

      review.save();

      product.reviews.push(review);
    }
    product.save();
  }
  res.end();
});

// GET /products with pagination
router.get('/products', async (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;

  try {
    const products = await Product.find()
      .skip(page * perPage - perPage)
      .limit(perPage);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(products));
  } catch (error) {
    return return400Error(res);
  }
});

// GET /products/:productid
router.get('/products/:productId', async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await Product.find({ _id: productId });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(product));
  } catch (error) {
    return return400Error(res);
  }
});

const return400Error = (res) => {
  res.writeHead(400);
  return res.end('Bad request');
};

const return404Error = (res) => {
  res.writeHead(404);
  return res.end('Parameter not found');
};

module.exports = router;

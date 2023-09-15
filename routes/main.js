/* eslint-disable no-plusplus */
const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');
const Product = require('../models/product');
const Review = require('../models/review');

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    const product = new Product();

    product.category = faker.commerce.department().toLowerCase();
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
  const { category, price, query } = req.query;

  const searchParameters = {};

  if (category) {
    searchParameters.category = category.toLowerCase();
  }

  if (query) {
    const searchTerm = new RegExp(query, 'i');
    searchParameters.name = { $regex: searchTerm };
  }

  if (price) {
    try {
      const products = await Product.find(searchParameters)
        .sort({ price: price.toLowerCase() === 'lowest' ? 1 : -1 })
        .skip(page * perPage - perPage)
        .limit(perPage);
      const numResults = await Product.countDocuments(searchParameters);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ numResults, products }));
    } catch (error) {
      return return400Error(res);
    }
  }

  try {
    const products = await Product.find(searchParameters)
      .skip(page * perPage - perPage)
      .limit(perPage);
    const numResults = await Product.countDocuments(searchParameters);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ numResults, products }));
  } catch (error) {
    return return400Error(res);
  }
});

// GET /products/:productId
router.get('/products/:productId', async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await Product.findOne({ _id: productId });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(product));
  } catch (error) {
    return return404Error(res);
  }
});

// GET /products/:productId/reviews with pagination
router.get('/products/:productId/reviews', async (req, res, next) => {
  const perPage = 4;
  const page = req.query.page || 1;
  const { productId } = req.params;

  try {
    const { reviews } = await Product.findOne({ _id: productId }).populate({
      path: 'reviews',
      options: {
        limit: perPage,
        skip: page * perPage - perPage
      }
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(reviews));
  } catch (error) {
    console.log(error);
    return return404Error(res);
  }
});

// POST /products
router.post('/products', async (req, res, next) => {
  try {
    const product = new Product(req.body);
    product.save();
    res.writeHead(200);
    return res.end('Product added successfully');
  } catch (error) {
    return return400Error(res);
  }
});

// POST /products/:productId/reviews
router.post('/products/:productId/reviews', async (req, res, next) => {
  const { productId } = req.params;

  try {
    const review = new Review(req.body);

    const { reviews } = await Product.findOne({ _id: productId });
    reviews.push(review);

    await Product.findOneAndUpdate(
      { _id: productId },
      { reviews },
      { new: true }
    );

    res.writeHead(200);
    return res.end('Review added successfully');
  } catch (error) {
    console.log(error);
    return return400Error(res);
  }
});

// DELETE /products/:productId
router.delete('/products/:productId', async (req, res, next) => {
  const { productId } = req.params;

  try {
    await Product.deleteOne({ _id: productId });
    res.writeHead(200);
    return res.end('Product deleted successfully');
  } catch (error) {
    return return404Error(res);
  }
});

// DELETE /reviews/:reviewId
router.delete('/reviews/:reviewId', async (req, res, next) => {
  const { reviewId } = req.params;

  try {
    await Review.deleteOne({ _id: reviewId });
    res.writeHead(200);
    return res.end('Review deleted successfully');
  } catch (error) {
    console.log(error);
    return return404Error(res);
  }
});

// Helper functions

const return400Error = (res) => {
  res.writeHead(400);
  return res.end('Bad request');
};

const return404Error = (res) => {
  res.writeHead(404);
  return res.end('Not found');
};

module.exports = router;

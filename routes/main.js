/** @module router */
/** Create API router */

/* eslint-disable no-plusplus */
const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');
const {
  findProducts,
  getUniqueAlphabeticalCategories,
  return400Error,
  return404Error
} = require('../utils/utils');
const Product = require('../models/product');
const Review = require('../models/review');

// GET /generate-fake-data
// Save 90 randomly generated items and reviews to db each time accessed
router.get('/generate-fake-data', (req, res, next) => {
  // first generate new product
  for (let i = 0; i < 90; i++) {
    const product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = 'https://via.placeholder.com/250?text=Product+Image';
    product.reviews = [];

    // randomly generate between 0-12 reviews per product
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
// Get all products matching search parameters
// 9 per page
router.get('/products', async (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;
  const { category, price, query } = req.query;

  const searchParameters = {};

  const pageParameters = {
    price,
    page,
    perPage
  };

  // if a category filter is applied, add to search parameters
  if (category) {
    searchParameters.category = category;
  }

  // if a search query is entered, add to search parameters
  if (query) {
    const searchTerm = new RegExp(query, 'i');
    searchParameters.name = { $regex: searchTerm };
  }

  // return products matching search parameters if price sorting is applied
  if (price) {
    try {
      return findProducts(searchParameters, pageParameters, res, true);
    } catch (error) {
      return return400Error(res);
    }
  }

  // otherwise return products matching search parameters without sorting
  try {
    return findProducts(searchParameters, pageParameters, res);
  } catch (error) {
    return return400Error(res);
  }
});

// GET /products/:productId
// Get product by ID
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
// get all reviews for a given product ID
// 4 per page
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
// Add a product
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
// Add a review to a given product
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
    return return400Error(res);
  }
});

// DELETE /products/:productId
// Delete a given product
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
// Delete a given review
router.delete('/reviews/:reviewId', async (req, res, next) => {
  const { reviewId } = req.params;

  try {
    await Review.deleteOne({ _id: reviewId });
    res.writeHead(200);
    return res.end('Review deleted successfully');
  } catch (error) {
    return return404Error(res);
  }
});

// GET /categories
// Get all existing product categories
router.get('/categories', async (req, res, next) => {
  try {
    const products = await Product.find({});
    const categories = getUniqueAlphabeticalCategories(products);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(categories));
  } catch (error) {
    return return400Error(res);
  }
});

module.exports = router;

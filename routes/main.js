const router = require('express').Router();
const mongoose = require('mongoose');
const { 
  addFakeData, 
  getProducts, 
  getProduct, 
  addProduct, 
  paginateReviews, 
  addReview 
} = require('../util/helpers');

//Checks that a valid productId is passed in the url
router.param('productId', (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid productId');
  }
  next();
});

// A route that adds fake data to the DB
router.get('/get-fake-data', addFakeData);

// A route to return all products (limit: 9 per page)
router.get('/products', getProducts);

// A route to return a specific product by id
router.get('/products/:productId', getProduct, (req, res) => {
  res.send(req.results);
});

// A route that returns reviews for a specific product id (limit: 4 per page)
router.get('/products/:productId/reviews', [getProduct, paginateReviews], (req, res) => { 
  res.send(req.results);
});

// A route to add a new product
router.post('/products', addProduct);

// A route to add a new review to a product
router.post('/products/:productId/reviews', addReview);

module.exports = router;
const router = require('express').Router();
const mongoose = require('mongoose');
const { 
  getProducts, 
  getProduct, 
  addProduct, 
  paginateReviews, 
  addReview,
  deleteProduct,
  deleteReview 
} = require('../util/helpers');

//Checks that a valid productId is passed in the url
router.param('productId', (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid productId');
  }
  next();
});

// A route to return all products (limit: 9 per page)
router.get('/', getProducts);

// A route to return a specific product by id
router.get('/:productId', getProduct, (req, res) => {
  res.send(req.results);
});

// A route that returns reviews for a specific product id (limit: 4 per page)
router.get('/:productId/reviews', [getProduct, paginateReviews]);

// A route to add a new product
router.post('/', addProduct);

// A route to add a new review to a product
router.post('/:productId/reviews', addReview);

// A route to delete a product
router.delete('/:productId', deleteProduct);

// A route to delete a review
router.delete('/:productId/reviews/:reviewId', deleteReview);

module.exports = router;
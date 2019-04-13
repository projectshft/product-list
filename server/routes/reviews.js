const router = require('express').Router();
const Product = require('../models/product');
const Review = require('../models/review');

// Gets the specific review for a supplied ID for any routes that take a specific review ID

router.param('review', (request, response, next, id) => {
  Review.find({ _id: id }, (error, review) => {
    if (error) {
      response.status(404).send('Review was not found');
    }

    request.review = review;
    next();
  });
});

// GET This endpoint returns a single review based on supplied ID

router.get('/reviews/:review', (request, response) => {
  response.send(request.review);
});

// DELETE This endpoint deletes a specific review based on supplied ID

router.delete('/reviews/:review', (request, response) => {
  Review.findOneAndDelete({ _id: request.review[0]._id }, (error, review) => {
    if (error) throw error;

    // Also deletes the review from the product reviews array
    Product.findOne({ _id: review.product._id }, (error, product) => {
      if (error) throw error;
      product.reviews.splice(product.reviews.indexOf(review._id), 1);
      product.save();
      response.send('Review was successfully deleted');
    });
  });
});

module.exports = router;
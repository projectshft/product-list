const router = require('express').Router();
const queryString = require('querystring');
const url = require('url');
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

module.exports = router;
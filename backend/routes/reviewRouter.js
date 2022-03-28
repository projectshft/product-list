const router = require('express').Router({ mergeParams: true });
const { Review } = require('../models/product');

// all routes to 'products/:productId/reviews'
router
  .route('/')
  .get((req, res) => {
    res.send(req.product.reviews);
  })
  .post((req, res) => {
    const { product } = req;
    const { testReview } = req.body;
    const { username, text } = testReview;

    const reviewToAdd = new Review();
    reviewToAdd.username = username;
    reviewToAdd.text = text;

    const duplicate = product.reviews.filter(
      (review) => review.text === reviewToAdd.text
    );
    if (duplicate.length) return res.status(400).end();

    product.reviews.push(reviewToAdd);
    product.save((err) => {
      if (!err) {
        res.send(reviewToAdd);
      } else {
        res.status(404).end();
      }
    });
  })
  .delete((req, res) => {
    const { product } = req;
    const { reviewIdToDelete } = req.body;

    product.reviews.id(reviewIdToDelete).remove();
    product.save();
    res.end();
  });

module.exports = router;

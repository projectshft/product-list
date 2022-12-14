const router = require('express').Router();

const Review = require('../models/review');
const Product = require('../models/product');

router.get('/', (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 9;

  Review.find()
    .skip(page * limit - limit)
    .limit(limit)
    .exec((err, reviews) => {
      if (err) {
        res.send({ error: true, message: err });
      }
      res.send(reviews);
    });
});

router.delete('/:reviewId', (req, res) => {
  Review.findByIdAndRemove(req.params.reviewId, (err, review) => {
    if (err) {
      res.send({ error: true, message: err });
    }
    Product.findById(review.product, (err, product) => {
      if (err) {
        throw err;
      }
      product.reviews.remove(req.params.reviewId);
      product.save();
    });
    res.send(review);
  });
});

module.exports = router;

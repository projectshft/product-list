const { Router } = require('express');
const { Review } = require('../models/review');
const { Product } = require('../models/product');

const router = Router();

// GET - Return all reviews, limit to 40 at a time
router.get('/', (req, res) => {
  const errors = {};
  // Limit response to 40 items
  const numberOfReviewsPerPage = 40;
  // Take query param for page#
  const { page } = req.query || 1;
  // Query data base for all reviews
  Review.find()
    .skip(numberOfReviewsPerPage * (page - 1))
    .limit(numberOfReviewsPerPage)
    .exec((err, reviews) => {
      if (err) {
        errors.query = 'Unable to complete query, please check query parameters and try again.';
        return res.status(400).send(errors);
      }
      res.send(reviews);
    });
});

// POST - create new review and add to specified product
router.post('/:productId', (req, res) => {
  const errors = {};
  const { productId } = req.params;
  const { userName, text } = req.body;

  // Find product w/ matching productId
  Product.findById(productId, (err, product) => {
    if (err) {
      errors.query = 'Product not found';
      return res.status(404).send(errors);
    }
    // Create review from req body data
    const review = new Review({
      userName,
      text,
      product: product._id
    });
    // Add review to product and save to db
    product.reviews.push(review);
    product.save();
    review.save();

    res.send(review);
  });
});

// DELETE - Delete review w/ specified reviewId
router.delete('/:reviewId', (req, res) => {
  const errors = {};
  const { reviewId } = req.params;
  // Find review w/ matching ID and delete
  Review.findByIdAndDelete(reviewId, (err, review) => {
    if (err) {
      errors.query = 'Review not found';
      return res.status(404).send(errors);
    }
    // Remove reference from associated product
    Product.findOneAndUpdate(
      { reviews: { $in: review._id } },
      { $pull: { reviews: { $in: review._id } } },
      { new: true },
      (err, product) => {
        if (err) {
          errors.query = 'Product not found';
          return res.status(404).send(errors);
        }
        res.send(product);
      }
    );
  });
});

module.exports = router;

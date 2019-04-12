const { Router } = require('express');
const { Review } = require('../models/review');

const router = Router();

// GET - Return all reviews, limit to 40 at a time
router.get('/', (req, res) => {
  // Query data base for all reviews
  // Limit response to 40 items
  // Take query param for page#
});

// POST - create new review and add to specified product
router.post('/:productId', (req, res) => {
  // Find product w/ matching productId
  // Create review from req body data
  // Add review to product and save to db
});

// DELETE - Delete review w/ specified reviewId
router.delete('/:reviewId', (req, res) => {
  // Find review w/ matching ID and delete
  // Remove reference from associated product?
});

module.exports = router;

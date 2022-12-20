const express = require('express');
const { deleteReview } = require('../controllers/reviewsController');

const router = express.Router();

// DELETE a review by id
router.delete('/:reviewId', deleteReview);

module.exports = router;

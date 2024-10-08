const express = require('express');
const router = express.Router();
const reviewController = require('../../controllers/reviewController'); // Make sure the path is correct


// In your reviews route file (e.g., api/reviews/index.js)

router.get('/', reviewController.getAllReviews);
router.post('/:productId', reviewController.createReview); // Create a new review
router.get('/:productId', reviewController.getReviewsByProductId); 
router.get('/reviews/:productId', reviewController.getPaginatedReviewsByProductId);

router.delete('/:reviewId', reviewController.deleteReview); 


module.exports = router;


const express = require('express');
const { deleteReview } = require('../controllers/reviewsController')

const router = express.Router();

//DELETE a review by id
router.get('/:review', deleteReview)


module.exports = router;
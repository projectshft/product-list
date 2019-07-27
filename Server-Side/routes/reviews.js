const router = require('express').Router();
const Product = require('../models/product');
const Review = require('../models/review');

/** get the correct review based on client supplied review ID
(for use in following routes)*/
router.param('review', (request, response, next, id) => {
	Review.find({ _id: id }, (err, review) => {
	  if (err) {
		response.status(404).send('Review was not found');
	  }    
	  request.review = review;
	  next();
	});
});

/** GET route for /reviews: 
(Returns all reviews but limited to 40 at a time)*/
router.get('/reviews', (request, response) => {
	const itemsReturned = 40;
	Review.find().limit(itemsReturned).exec((err, reviews) => {
		if (err) throw err;
		response.send(reviews);
	});
});

/** DELETE route for /reviews/:review
(Deletes a review from the reviews collection, also deletes the review from the 
	product reviews array in the products collection based on client supplied review ID) */
router.delete('/reviews/:review', (request, response) => {
	Review.findOneAndDelete({ _id: request.review[0]._id }, (err, review) => {
		if (err) throw err;
		Product.findOne({ _id: review.product._id }, (err, product) => {
			if (err) throw err;
			product.reviews.splice(product.reviews.indexOf(review._id), 1);
			product.save();
			response.send('Successfully deleted review from both reviews collection and product collection');
		});
	});
});

module.exports = router;
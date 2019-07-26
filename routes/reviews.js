const router = require('express').Router();
const Product = require('../models/product');
const Review = require('../models/review');


/** GET route for /reviews: 
(Returns all reviews but limited to 40 at a time.)*/
router.get('/reviews', (request, response) => {
	Review.find().exec((err, data) => {
		if (err) throw err;
		response.send(data);
	});
});

module.exports = router;
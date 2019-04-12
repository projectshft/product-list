const { Router } = require('express');
const { Review } = require('../models/review');

const router = Router();

router.get('/', (req, res) => {
  const numberOfReviewsPerPage = 10;
  // If there are query parameters, get page number specified
  if (req.query) {
    const { page } = req.query;

    Review.find()
      .skip(numberOfReviewsPerPage * (page - 1))
      .limit(numberOfReviewsPerPage)
      .exec((err, reviews) => {
        if (err) throw err;
        res.send(reviews);
      });
  }
});

module.exports = router;

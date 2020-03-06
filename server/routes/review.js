const router = require('express').Router();
const Review = require('../models/review');

//GET route for /reviews
router.get('/', (req, res, next) => {
  Review.find().limit(3).exec((err, result) => {
    Review.count().exec((err, count) => {
      if (err) throw err;
      res.send(result);
    })
  })
});

//DELETE route for /reviews/:reviewId
router.delete('/:reviewId', (req, res, next) => {
  let { reviewId } = req.params;
  Review.deleteOne({ _id: reviewId }).exec((err, result) => {
    if (err) throw err;
    res.send(result);
  })
});


module.exports = router;
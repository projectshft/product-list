const router = require('express').Router()
const Product = require('../models/product')
const Review = require('../models/review')


// returns ALL reviews, 40 at a time, paginate.
router.get('/reviews', (req, res) => {
  const perPage = 40
  const page = req.query.page || 1

  Review
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      if (err) {
        return console.error(err)
      }
      res.send(reviews)
    });
});

// delete review by ID
router.delete('/reviews/:review', (req, res, next) => {
  Review
    .findById(req.params.id)
    .exec((err, review) => {
      if (!err) {
        review.remove();
        res.send(`Delete Complete ${req.params.id}`);
      } else {
        console.log(err);
      }
    })
});

module.exports = router
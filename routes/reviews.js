const router = require('express').Router();
const Review = require('../models/review')
const Product = require('../models/product')

router.get('/', (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 9;

  Review.find()
    .skip((Number(page) - 1) * 9)
    .limit(Number(limit))
    .exec((error, reviews) => {
      if(error) {
        res.send({"error": true, 'message': error});
      }
      res.send(reviews)
    })
})

module.exports = router;

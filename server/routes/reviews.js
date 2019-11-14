const router = require('express').Router()
const Product = require('../models/product')
const Review = require('../models/review')
const cors = require('cors')


 router.get('/reviews', (req, res) => {
    const perPage = 40
    const page = req.query.page || 1
  
    Review
      .find()
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, reviews) => {
        if (err) throw err
        else res.send(reviews)
      })
  })


router.delete('/reviews/:review', (req, res, next) => {
  Review
    .findById(req.params.id)
    .exec((err, review) => {
        if (err) throw err
        else review.remove();
      })
      
});

module.exports = router
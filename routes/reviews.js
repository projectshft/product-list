const router = require('express').Router()
const Product = require('../models/product')
const Review = require('../models/review')

//get all reviews- limited to 40 per page
router.get('/', (req, res) => {
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

//delete a review
router.delete('/:review', (req, res) => {
  Review
    .deleteOne({ _id: req.params.review })
    .exec((err, product) => {
      if (err) {
        return console.error(err)
      }
      res.send(`Review #${req.params.review} successfully deleted`)
    })
})

module.exports = router
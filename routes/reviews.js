const router = require('express').Router()
const Product = require('../models/product')
const Review = require('../models/review')

//Find ID of selected review
router.param('review', function(req, res, next, id) {
  next();
})

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

router.post('/:product/reviews', (req, res) => {
  let newReview = new Review ({
    userName: req.body.userName,
    text: req.body.text,
    product: req.params.product
  })

  newReview.save()

  res.send(`The following review was successfully added: ${newReview}`)
})

module.exports = router
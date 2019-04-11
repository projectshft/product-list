const router = require('express').Router()
const Product = require('../models/product')
const Review = require('../models/review')

//Find ID of selected review
router.param('review', function(req, res, next, id) {
  next();
})

//get all reviews- limited to 40 per page
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

//post a new review
router.post('/:product/reviews', (req, res) => {
  let newReview = new Review ({
    userName: req.body.userName,
    text: req.body.text,
    product: req.params.product
  })

  newReview.save()

  res.send(`The following review was successfully added: ${newReview}`)
})

//delete a review
router.delete('/reviews/:review', (req, res) => {
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
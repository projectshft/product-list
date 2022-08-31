const router = require("express").Router();
const Product = require("../models/products");
const Review = require("../models/reviews");

// DELETE a given review by ID
router.delete("/:reviewId", (req, res, next) => {
  Review.findByIdAndDelete(req.params.reviewId)
  .exec((err, review) => {
    if (err) return next(err);

    if (review) {
      Product.findByIdAndUpdate(review.product, {$pullAll: { reviews: [{_id: req.params.reviewId}] }}, {new: true})
      .exec((err, product) => {
        if (err) return next(err);
        return product ? res.status(204).send() : res.status(404).end()
      })
    } else {
      res.status(404).end()
    }
  });
});

module.exports = router;
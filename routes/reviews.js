const router = require("express").Router();
const Product = require("../models/product");
const Review = require("../models/review");
const mongoose = require("mongoose");

router.delete('/:review', (req, res) => {
  Review.findByIdAndDelete(req.params.review).exec((err, deletedReview) => {
    if(err) {
      res.status(404).send("Review Not Found");
      console.error(err);
      return;
    }
    res.send("Review Deleted");
  })
})

module.exports = router;
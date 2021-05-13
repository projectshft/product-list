const router = require("express").Router();
const Product = require("../models/product");
const Review = require("../models/review");
const mongoose = require("mongoose");

router.delete('/:review', (req, res) => {
  //TODO: Figure out if I need to do anything to delete the review from the corresponding product's reviews array as well.
  Review.findByIdAndDelete(req.params.review).exec((err, deletedReview) => {
    if(err) {
      // TODO: Make the condition more specific so the 404 status is sent only if the review is not found and not if any other error occurs
      res.status(404).send("Review Not Found");
      console.error(err);
      return;
    }
    res.send("Review Deleted");
  })
})

module.exports = router;
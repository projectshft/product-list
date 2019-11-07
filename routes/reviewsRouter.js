const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Review = require("../models/review");

const RESULTS_PER_PAGE = 40;

router.get("/", (req, res) => {
  // return the first page by default
  const page = req.query.page || 1;
  let perPage = RESULTS_PER_PAGE;
  if (page <= 0) {
    res.status(400);
    res.send("Page Must Be Greater Than 0 or Excluded");
  } else {
    Review.find({})
      .select("-__v")
      .populate("product", "-reviews -__v")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((err, reviews) => {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          Review.count().exec((err, count) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.send({
                reviewCount: count,
                page,
                perPage,
                reviews: reviews.map(review => {
                  return review.toJSON();
                })
              });
            }
          });
        }
      });
  }
});

router.delete("/:review", function(req, res) {
  //find review
  Review.findById(req.params.review, function(error, review) {
    if (error) {
      res.status(500).send(error);
    } else {
      //remove the review
      review.remove(function(error) {
        if (error) {
          res.status(500).send(error);
        } else {
          //remove references to this review from the product as well
          Product.update(
            { reviews: { $in: req.params.review } },
            { $pull: { reviews: req.params.review } },
            function(error, numberAffected) {
              if (error) {
                res.status(500).send(error);
              } else {
                console.log("Products with review: ", numberAffected);
                res.status(204);
                res.end();
              }
            }
          );
        }
      });
    }
  });
});

module.exports = router;

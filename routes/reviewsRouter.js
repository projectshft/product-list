const express = require("express");
const router = express.Router();
const Review = require("../models/review");

const RESULTS_PER_PAGE = 40;

router.get("/", (req, res, next) => {
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
              res.send({ reviewCount: count, page, perPage, reviews });
            }
          });
        }
      });
  }
});

module.exports = router;

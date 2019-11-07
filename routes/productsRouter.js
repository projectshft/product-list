const express = require("express");
const router = express.Router();
const Product = require("../models/product");

const RESULTS_PER_PAGE = 10;

router.get("/", (req, res, next) => {
  // return the first page by default
  const page = req.query.page || 1;
  let perPage = RESULTS_PER_PAGE;
  if (page <= 0) {
    res.status(400);
    res.send("Page Must Be Greater Than 0 or Excluded");
  } else {
    Product.find({})
      .select("-__v")
      .populate("reviews", "-__v")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((err, products) => {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
          Product.count().exec((err, count) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.send({ productCount: count, page, perPage, products });
            }
          });
        }
      });
  }
});

router.get("/:product", (req, res, next) => {
  Product.findById(req.params.product)
    .select("-__v")
    .populate("reviews", "-product -__v")
    .exec((err, product) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(product);
      }
    });
});

// router.get("/:review", function(req, res, next) {
//   res.json(req.review);
// });

// router.post("/", function(req, res, next) {
//   req.beer.reviews = req.body.slice(0);
//   res.json(req.beer.reviews);
// });

// router.put("/:review", function(req, res, next) {
//   if (req.body.text) {
//     req.review.text = req.body.text;
//   }

//   res.json(req.review);
// });

// router.delete("/:review", function(req, res) {
//   req.beer.reviews.splice(req.beer.reviews.indexOf(req.review), 1);
//   res.json(req.beer.reviews);
// });

module.exports = router;

const express = require("express");
const router = express.Router();
const Product = require("../models/product");

const RESULTS_PER_PAGE = 10;

let ProductModel = require("../models/product");

router.get("/", (req, res) => {
  // return the first page by default
  const page = req.query.page || 1;
  let perPage = RESULTS_PER_PAGE;
  if (page <= 0) {
    res.status(400);
    res.send("Page Must Be Greater Than 0 or Excluded");
  } else {
    Product.find({})
      .select("-__v")
      .populate("reviews", "-product -__v")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((err, products) => {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          Product.count().exec((err, count) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.send({
                productCount: count,
                page,
                perPage,
                products: products.map(product => {
                  return product.toJSON();
                })
              });
            }
          });
        }
      });
  }
});

router.get("/:product", (req, res) => {
  Product.findById(req.params.product)
    .select("-__v")
    .populate("reviews", "-product -__v")
    .exec((err, product) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(product.toJSON());
      }
    });
});

router.post("/", function(req, res) {
  var product = new ProductModel(req.body);

  product.save(function(err, product) {
    if (err) {
      res.status(500).send(err);
    }

    res.json(product.toJSON());
  });
});

module.exports = router;

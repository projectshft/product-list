const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Review = require("../models/review");

const RESULTS_PER_PAGE = 9;

router.get("/", (req, res) => {
  // return the first page by default
  const page = req.query.page || 1;
  let perPage = RESULTS_PER_PAGE;

  let { category, price, query } = req.query;

  let filter = {};
  let sort = {};

  //case insensitive regex match for category
  if (category) {
    filter.category = { $regex: new RegExp(category, "i") };
  }

  if (query) {
    filter.name = { $regex: new RegExp(query, "i") };
  }

  if (price) {
    switch (price.toLowerCase()) {
      case "highest":
        sort.price = -1;
        break;
      case "lowest":
        sort.price = 1;
        break;
      default:
        res.status(400);
        res.send("Invalid Price Query: " + price);
        break;
    }
  }

  if (page <= 0) {
    res.status(400);
    res.send("Page Must Be Greater Than 0 or Excluded");
  } else {
    Product.find(filter)
      .select("-__v")
      .sort(sort)
      .populate("reviews", "-product -__v")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((err, products) => {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          Product.count(filter).exec((err, count) => {
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
  var product = new Product(req.body);

  product.save(function(err, product) {
    if (err) {
      res.status(500).send(err);
    }

    res.json(product.toJSON());
  });
});

router.post("/:product/reviews", function(req, res) {
  //find the product first
  Product.findById(req.params.product, (err, product) => {
    if (err) {
      res.status(500).send(err);
    } else {
      //create the review with the found products id as a reference
      var review = new Review(
        Object.assign({ product: product._id }, req.body)
      );

      review.save(function(err, product) {
        //update the product with the new review id
        Product.updateOne(
          { _id: product._id },
          { $push: { reviews: review._id } },
          function() {
            product.save(function(err, product) {
              if (err) {
                res.status(500).send(err);
              }

              //populate the returned review with the product's data
              Review.populate(
                review,
                { path: "product", select: "-reviews -__v" },
                function(err, review) {
                  if (err) {
                    res.status(500).send(err);
                  }

                  res.json(review.toJSON());
                }
              );
            });
          }
        );
      });
    }
  });
});

router.delete("/:product", function(req, res) {
  //find product
  Product.findById(req.params.product, function(error, product) {
    if (error) {
      res.status(500).send(err);
    } else {
      //remove the product
      product.remove(function(err) {
        if (error) {
          res.status(500).send(err);
        } else {
          //remove any reviews from the product as well
          Review.remove({ product: req.params.product }, function(err) {
            res.status(204);
            res.end();
          });
        }
      });
    }
  });
});

module.exports = router;

const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

router.get("/products", (req, res, next) => {
  const perPage = 9;
  // return the first page by default
  const page = req.query.page || 1;

  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

router.get("/products/:product", (req, res, next) => {
  const {product} = req.params; 

  Product.find({_id: product})
    .exec((err, product) => {
      if (err) return next(err);

      res.send(product[0]);
    });
});

router.get("/products/:product/reviews", (req, res, next) => {
  const perPage = 4;
  // return the first page by default
  const page = req.query.page || 1;
  const {product} = req.params; 

  Product.find({_id: product})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, product) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(product[0].reviews);
      });
    });
});

module.exports = router;
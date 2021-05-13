const router = require("express").Router();
const Product = require("../models/product");
const Review = require("../models/review");
const mongoose = require("mongoose");

router.param("product", (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if(err) {
      console.error(err)
    }
    req.product = product;
    next();
  })
})

router.get("/", (req, res, next) => {
  const page = req.query.page || 1;
  const perPage = 9;
  Product.find({})
    .skip((page-1)*perPage)
    .limit(perPage)
    .exec((err, products) => {
      if(err) {
        console.log(err);
      }
      res.send(products);
    })
});

router.get("/:product", (req, res, next) => {
  if(!req.product) {
    res.status(404).send("Product Not Found");
    return;
  }
  res.send(req.product);
})

router.get("/:product/reviews", (req, res, next) => {
  if(!req.product) {
    res.status(404).send("Product Not Found");
    return;
  }
  res.send(req.product.reviews);
})

module.exports = router;
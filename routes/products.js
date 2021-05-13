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

router.post("/", (req, res) => {
  //TODO: Check if inputs missing from body
  const newProduct = new Product();
  newProduct.category = req.body.category;
  newProduct.name = req.body.name;
  newProduct.price = req.body.price;
  newProduct.image = req.body.image;
  newProduct.reviews = [];

  newProduct.save().then(savedProduct => {
    res.send(savedProduct);
  })
})

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
  //TODO: Paginate to just 4 and deal with population
  res.send(req.product.reviews);
})

module.exports = router;
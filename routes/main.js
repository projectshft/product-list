const router = require("express").Router();
const async = require("async");
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

router.get("/products", (req, res, next) => {
  const resultsPerPage = 9;
  const page = req.query.page || 1;

  Product.find({})
    .skip(resultsPerPage * page - resultsPerPage)
    .limit(resultsPerPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

router.get("/products/:product", (req, res, next) => {
  const { product } = req.params;

  Product.find({ _id: product }).exec((err, product) => {
    if (err) return next(err);

    res.send(product);
  });
});

router.get("/products/:product/reviews", (req, res, next) => {
  const { product } = req.params;
  const { page } = req.query;

  Product.find({ _id: product })
    // .populate("reviews")
    .exec((err, product) => {
      if (err) return next(err);

      res.send(product[0].reviews);
    });
});

router.post("/products", (req, res, next) => {});

router.post("/products/:product/reviews", (req, res, next) => {});

router.delete("/products/:product", (req, res, next) => {});

router.delete("/reviews/:review", (req, res, next) => {});

module.exports = router;

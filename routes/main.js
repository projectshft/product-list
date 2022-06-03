const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const queryString = require('querystring');

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
  const perPage = 9;

  const page = req.query.page || 1;

  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

module.exports = router;
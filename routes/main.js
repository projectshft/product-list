const router = require("express").Router();
const { faker } = require("@faker-js/faker");
const { Product, Review } = require("../models/product");

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

// Router params will go here.

router.get("/products", (req, res, next) => {
  const perPage = 9;
  page = req.query.page || 1;
  Product.find({})
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec((err, product) => {
      res.send(product);
    });
});

module.exports = router;

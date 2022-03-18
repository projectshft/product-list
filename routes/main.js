const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

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
  const pageNumber = req.query['page'] || '1';

  const numToSkip = (parseInt(pageNumber) - 1) * 9;

  Product.find((error, products) => {
    Product.count((err, count) => {
      res.send(products);
    });
  }).skip(numToSkip).limit(9);
});

module.exports = router;
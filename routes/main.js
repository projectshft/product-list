const queryString = require("querystring");
const url = require("url");
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
  const queryParams = queryString.parse(url.parse(req.url).query);

  const pageNum = queryParams.page || 1;

  Product
  .find()
  .skip(9 * (pageNum - 1))
  .limit(9)
  .exec()
  .then(product => {
    res.send(product)
  })
});

module.exports = router;
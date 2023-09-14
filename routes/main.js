const router = require("express").Router();
const { faker } = require('@faker-js/faker');
const Product = require("../models/product");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    product.save();
  }
  res.end();
});

router.get("/products", (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;

  if (!parseInt(page)) {
    return return400Error(res);
  }

  Product
    .find()
    .skip((page * perPage) - perPage)
    .limit(perPage)
    .exec()
    .then((products) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(products));
    });
});

const return400Error = (res) => {
  res.writeHead(400);
  return res.end('Bad request. Parameter must be an integer and larger than 0');
};

module.exports = router;
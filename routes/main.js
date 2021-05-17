const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const products = require("./products");
const reviews = require("./reviews");
const Review = require("../models/review");
const mongoose = require("mongoose");

router.use("/products", products);

router.use("/reviews", reviews);

router.get("/categories", (req, res) => {
  Product.find().distinct('category').exec((err, categories) => {
    if(err) {
      console.error(err);
    }
    res.send(categories)
  });
})

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews = [];

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

module.exports = router;
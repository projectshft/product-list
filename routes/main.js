const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

//Generate fake data for the DB
router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews = [];

    product.save();
  }  
  res.end();
});

// GET all products and limit them to 9 products per page
router.get("/products", async (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;

  try {
    let products = await Product.find().skip(perPage * page - perPage).limit(perPage).exec();

    res.send(products);
  } catch (err) {
    if (err) return next(err);
  };
});

module.exports = router;
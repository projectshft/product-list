const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

// generate 90 fake data products for the database
router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    // comment out since database has enough fake data products
    // product.save();
  }
  res.end();
});

// GET all the products but limit the display to load only 9 products at one time
router.get("/products", (req, res, next) => {
  // set default to load first 9 products on page 1
  const productsPerPage = 9;
  const page = req.query.page || 1; 
  const homepageProducts = (page - 1) * productsPerPage;

  const category = req.query.category;

  try {
    const products = Product.find()
      .skip(homepageProducts)
      .limit(productsPerPage)
      .exec();

    res.send(products);
  } catch (error) {
    if (error) return next (error);
  }
  
  res.end();
});

module.exports = router;
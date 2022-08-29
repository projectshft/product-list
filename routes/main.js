const router = require("express").Router();
const Product = require("../models/products");
const { faker } = require("@faker-js/faker");

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
  
  // return the first page by default
  const { page } = req.query || 1;

  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Product.count().exec((err, count) => {
        if (err) return next(err);
        console.log(count)
        res.send(products);
      });
    });
});

// GET product by ID
router.get("/products/:productId", (req, res, next) => {
  const { productId } = req.params
  
  Product.findById(productId)
    .exec((err, product) => {
      if (err) return next(err);
      res.send(product);
    });
});

module.exports = router;
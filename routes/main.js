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
    product.reviews = [];

    for (let j = 0; j < 8; j++) {
      let review = new Review();
      review.userName = faker.internet.userName();
      review.text = faker.lorem.text();
      review.product = product._id;
      product.reviews.push(review._id);

      review.save((err) => {
        if (err) throw err;
      });
    }
    // review.product.push(product);
    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

// Router params will go here.
router.param("product", function (req, res, next, id) {
  Product.findById({ _id: `${id}` }).exec((err, product) => {
    if (err) {
      return next(err);
    }
    req.product = product;
    next();
  });
});

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

router.get("/products/:product", (req, res) => {
  const product = req.product;
  res.send(product);
});

module.exports = router;

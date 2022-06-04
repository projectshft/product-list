const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");
const queryString = require('querystring');

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();
    let review = new Review();

    review.username = faker.internet.userName();
    review.text = faker.commerce.productName();
    review.product = product._id;

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews = [review._id];
    
    product.save((err) => {
      if (err) throw err;
    });

    review.save((err) => {
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

/* ===================
  GET products by id
  =================== */
router.get("/products/:product", (req, res, next) => {
  const { product } = req.params;

  Product.findOne({ _id: product })
    .populate("reviews")
    .exec((err, returnProduct) => {
      if (err) return next(err);

      res.send(returnProduct);
    });
})

/* =====================================
  GET all reviews for a product (limit 4)
  ===================================== */

/* ===================
  POST new product
  =================== */

/* ===========================
  POST new review to a product
  ========================== */

/* ===================
  DELETE product by id
  =================== */

/* ===================
  DELETE review by id
  =================== */

module.exports = router;
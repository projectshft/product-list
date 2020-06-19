const router = require("express").Router();
const faker = require("faker");
const ReviewSchema = require("../models/review");
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

// we want to grab and send the product id for different routes that need it
router.param("product", function (req, res, next, id) {
  // we need to find the product that matches
  Product.findById(id, (err, product) => {
    if (err) throw err;
    req.product = product;
    next();
  });
});

router.get("/products", (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;

  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      /* Note that we're not sending `count` back at the moment, 
      but in the future we might want to know how many are coming 
      back so we can figure out the number of pages */
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

// Returns a specific product by its id
router.get("/products/:product", (req, res) => {
  res.send(req.product);
});

// Creates a new product in the database
router.post("/products", (req, res) => {});

// Creates a new review in the database by adding it to the correct product's reviews array.
router.post("/products/:product/reviews", (req, res) => {
  // construct the comment
  const comment = {
    userName: req.body.userName,
    text: req.body.text,
  };

  // add the review to the post
  req.product.reviews.push(comment);

  req.product.save((err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;

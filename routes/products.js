const router = require("express").Router();
const Product = require("../models/products");
const Review = require("../models/reviews");

// GET all products (nine per page)
router.get("/", (req, res, next) => {
  const perPage = 9;
  const { page } = req.query || 1;

  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

// GET product by ID
router.get("/:product", (req, res, next) => {
  const { product } = req.params;
  
  Product.findById(product)
    .exec((err, product) => {
      if (err) return next(err);
      res.send(product);
    });
});

// GET reviews for a product by ID (four per page)
router.get("/:product/reviews", (req, res, next) => {
  const perPage = 4;
  const { page } = req.query || 1;
  const { product } = req.params;
  
  Review.find({ product: product })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, review) => {
      if (err) return next(err);
      res.send(review);
    });
});

module.exports = router;
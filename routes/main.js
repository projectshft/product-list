const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

router.get("/products", (req, res, next) => {
  const perPage = 9;
  // return the first page by default
  const page = req.query.page || 1;
  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Product.estimatedDocumentCount().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

router.get("/products/:product", (req, res) => {
  requestedId = req.params.product;
  Product.findById(requestedId).exec((err, product) => {
    // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
    res.send(product);
  });
});

router.get("/reviews", (req, res, next) => {
  const perPage = 40;
  // return the first page by default
  const page = req.query.page || 1;
  Review.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Review.estimatedDocumentCount().exec((err, count) => {
        if (err) return next(err);

        res.send(reviews);
      });
    });
});

router.post("/products", (req, res) => {
  product = new Product();
  product.category = req.body.category;
  product.name = req.body.name;
  product.price = req.body.price;
  product.image = req.body.imageUrl;
  product.reviews = [];
  product.save();
  res.send(product);
});

router.post("/:product/reviews", (req, res) => {
  const productId = req.params.product;
  review = new Review();
  review.userName = req.body.userName;
  review.text = req.body.text;
  review.product = productId;
  review.save();
  Product.findByIdAndUpdate(productId, {$push: {reviews: review}})
  .exec()
  res.send(review);
});

router.delete("/products/:product", (req, res) => {
  const productId = req.params.product;
  Product.findByIdAndDelete(productId, (err, product) => {
    if (product) {
      res.status(200).send(productId + " was deleted.")
    } else {
      return res.status(404).send("Id not found error.")
    }
  })
});

router.delete("/reviews/:review", (req, res) => {
  const reviewId = req.params.review;
  Review.findByIdAndDelete(reviewId)
  .exec()
  res.send(reviewId + " was deleted.")
});

module.exports = router;

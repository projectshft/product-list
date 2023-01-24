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

// Experimental router params

// Router params
router.param("product", function (req, res, next, id) {
  Product.findById({ _id: `${id}` }).exec((err, product) => {
    if (err) {
      return next(err);
    }
    req.product = product;
    next();
  });
});

// Router param for :review
router.param("review", function (req, res, next, id) {
  Review.findById({ _id: `${id}` })
    .populate("reviews")
    .exec((err, review) => {
      if (err) {
        return next(err);
      }
      req.product.review = review;
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

router.get("/products/:product/reviews", (req, res) => {
  const perReviewPage = 4;
  page = req.query.page || 1;
  Product.find({ _id: req.product._id })
    .populate({
      path: "reviews",
      options: {
        limit: perReviewPage,
        skip: (page - 1) * perReviewPage,
      },
    })
    .exec((err, review) => {
      if (err) {
        res.send(err);
      }
      res.send(review);
    });
});

// Post methods

router.post("/products", (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .then(() => res.json("Product added!"))
    .catch((err) => res.status(400).json("Error " + err));
});

router.post("/products/:product/reviews", (req, res) => {
  // First step is to create the review.
  const review = new Review(req.body);
  // req.product._id is pointing to the router param and will be saved in the review.product array.
  review.product = req.product._id;

  // Second step is to save the review to database and then to push the saved review to product array as an objectId.
  review.save((err) => {
    if (err) {
      throw err;
    }
    Product.findById({ _id: req.product._id }, (err, product) => {
      if (err) {
        throw err;
      }
      product.reviews.push(review._id);
      product.save((err) => {
        if (err) {
          throw err;
        }
        res.json("Review added to the product!");
      });
    });
  });
});
// Sort by category
// Product.find({ category: "Beauty" }).exec((err, product) => {
//   console.log(product);
// });

module.exports = router;

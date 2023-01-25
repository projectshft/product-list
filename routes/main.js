const router = require("express").Router();
const { faker } = require("@faker-js/faker");
const { query } = require("express");
const e = require("express");
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
  page = req.query.page ? parseInt(req.query.page) : 1;
  category = req.query.category || "";
  sort = req.query.sort || "";
  searchQuery = req.query.searchQuery || "";

  let filterCriteria = {};
  if (category && !searchQuery) {
    filterCriteria = { category: category };
  } else if (category && searchQuery) {
    filterCriteria = {
      name: { $regex: searchQuery, $options: "i" },
      category: category,
    };
  } else if (searchQuery && !category) {
    filterCriteria = {
      name: { $regex: searchQuery, $options: "i" },
    };
  }

  let sortCriteria = {};
  if (sort === "asc") {
    sortCriteria = { price: 1 };
  } else if (sort === "desc") {
    sortCriteria = { price: -1 };
  }

  // let catAndSearch = {
  //   name: { $regex: /salad/, $options: "i" },
  //   category: "Grocery",
  // };

  //Standard product list of 9.
  Product.find(filterCriteria)
    .sort(sortCriteria)
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec((err, product) => {
      if (err) {
        res.send(err);
      } else {
        res.send(product);
      }
    });
});

router.get("/products/:product", (req, res) => {
  const product = req.product;
  res.send(product);
});

router.get("/reviews", (req, res) => {
  Review.find({})
    .populate("product")
    .exec((err, reviews) => {
      if (err) {
        throw err;
      }
      res.send(reviews);
    });
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

router.delete("/products/:product", (req, res) => {
  Product.deleteOne({ _id: req.product._id }).exec((err, product) => {
    if (err) {
      throw err;
    }
    res.json("Product deleted!");
  });
});

// Finish delete review
router.delete("/reviews/:reviewId", (req, res) => {
  Review.findByIdAndDelete({ _id: req.params.reviewId }).exec((err, review) => {
    if (!review) {
      res.status(404).json("no review with this id.");
      return;
    }
    if (err) {
      throw err;
    }
    // Clean up Objectid references in product
    Product.updateMany(
      { reviews: review._id },
      { $pull: { reviews: review._id } },
      (err) => {
        if (err) {
          throw err;
        }
        res.json("Review Deleted!");
      }
    );
  });
});

// Product.find(catAndSearch).exec((err, product) => {
//   if (err) {
//     throw err;
//   }
//   console.log(product);
// });

module.exports = router;

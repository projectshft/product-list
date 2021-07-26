const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

//LOAD database with fake data
// router.get("/generate-fake-data", (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product();

//     product.category = faker.commerce.department().toUpperCase();
//     product.name = faker.commerce.productName().toUpperCase();
//     product.price = faker.commerce.price();
//     product.image = "https://via.placeholder.com/250?text=Product+Image";

//     product.save((err) => {
//       if (err) throw err;
//     });
//   }
//   res.end();
// });

router.param("product", function (req, res, next, id) {
  Product.find({ _id: id }, function (err, product) {
    if (err) {
      next(err);
    } else {
      req.product = product[0];
      next();
    }
  });
});

router.param("review", function (req, res, next, id) {
  Review.find({ _id: id }, function (err, review) {
    if (err) {
      next(err);
    } else {
      req.review = review[0];
      next();
    }
  });
});

router.get("/products", (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;

  let query;
  let sortData;
  let data = {};

  if (!req.query) {
    query = {};
  }
  //category
  if (req.query.category) {
    query = { category: req.query.category.toUpperCase() };
  }

  //sort by price
  if (req.query.price) {
    if (req.query.price === "highest") {
      sortData = { price: -1 };
    } else if (req.query.price === "lowest") {
      sortData = { price: 1 };
    } else {
      sortData = null;
    }
  }

  //db search based on user search input
  if (req.query.query) {
    const searchString = req.query.query.toUpperCase();

    //checks to see if string = 1 word
    //if 1 word search all docs for that word with or w/o category
    if (searchString.split(/\W+/).length === 1) {
      if (req.query.query && req.query.category) {
        query = {
          $text: { $search: `${searchString}` },
          category: req.query.category.toUpperCase(),
        };
      } else {
        query = { $text: { $search: searchString } };
      }
      //if > 1 word do exact match w/ or w/o category
    } else {
      if (req.query.query && req.query.category) {
        query = {
          $text: { $search: `\"${searchString}\"` },
          category: req.query.category.toUpperCase(),
        };
      } else {
        query = {
          $text: { $search: `\"${searchString}\"` },
        };
      }
    }
  }

  Product.find(query)
    .sort(sortData)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.countDocuments(query, (err, count) => {
        if (err) return next(err);

        data = {
          products: products,
          count: count,
        };

        if (data.count === 0) {
          res.status(404).send("Product not found.");
        } else {
          res.status(200).send(data);
        }
      });
    });
});

router.get("/products/:product", (req, res, next) => {
  if (!req.product) {
    res.status(404).send("Product not found.");
  } else {
    res.status(200).send(req.product);
  }

  //const id = req.params.product;
  // Product.findById(id).exec((err, product) => {
  //   if (err) return next(err);
  //   res.status(200).send(product);
  //   res.end();
  // });
});

//GET /products/:product/reviews
router.get("/products/:product/reviews", (req, res, next) => {
  const reviewsPerPage = 4;

  Product.findOne({ _id: req.product._id })
    .populate("reviews")
    .limit(reviewsPerPage)
    .exec((err, product) => {
      if (err) {
        return next(err);
      } else {
        res.status(200).send(product.reviews);
      }
    });
});

//POST /products
router.post("/products", (req, res, next) => {
  if (
    !req.body.category ||
    !req.body.name ||
    !req.body.price ||
    !req.body.image
  ) {
    res.status(400).send("Bad request");
  } else {
    const product = new Product(req.body);
    product.save();
    res.status(200).send("Product saved");
  }
});

//POST /products/:product/reviews
router.post("/products/:product/reviews", (req, res, next) => {
  const product = req.product;

  if (!req.body.username || !req.body.text) {
    res.status(400).send("Bad request");
  } else {
    const review = new Review({ product: product._id, ...req.body });
    review.save();

    product.reviews.push(review);
    product.save();
    res.status(200).send("Review saved");
  }
});

//DELETE /products/:product
router.delete("/products/:product", async (req, res, next) => {
  const product = req.product;

  if (!product) {
    res.status(404).send("Product not found.");
  } else {
    await Product.remove({ _id: product._id });
    res.send(`${product.name} deleted.`);
  }
});

//DELETE /reviews/:review
router.delete("/reviews/:review", async (req, res, next) => {
  const review = req.review;

  const productID = review.product;
  const update = { $pull: { reviews: review._id } };

  if (!review) {
    res.status(404).send("Review not found.");
  } else {
    await Review.remove({ _id: review._id });
    await Product.findByIdAndUpdate(productID, update, (err, doc) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(200).send(`${review.text} was successfully deleted.`);
  }
});

module.exports = router;

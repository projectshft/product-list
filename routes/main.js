const router = require("express").Router();
const faker = require("faker");
const { Product, Review } = require("../models/product");

router.param("product", async function (req, res, next, id) {
  req.product = await Product.findById(id).populate("reviews");

  if (!req.product) {
    throw new Error("No product found with id provided");
  }

  next();
});

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews = [];

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

router.get("/products", (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;

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

router.get("/products/:product", (req, res) => {
  res.json(req.product);
});

router.get("/products/:product/reviews", (req, res) => {
  const product = req.product;

  const perPage = 4;

  // return the first page by default
  const page = req.query.page || 1;

  Review.find({ product: product._id })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Review.countDocuments().exec((err, count) => {
        if (err) return next(err);

        res.json(reviews);
      });
    });
});

router.post("/products", (req, res) => {});

router.post("/products/:product/reviews", (req, res) => {
  const product = req.product;
  const userName = req.body.userName;
  const text = req.body.text;

  addReview(product, userName, text);

  res.json(product);
});

// ***** Helper Functions *****
const addReview = (product, userName, text) => {
  const review = new Review({
    userName,
    text,
    product: product._id,
  });

  product.reviews.push(review);
  review.save();
  product.save();
};

module.exports = router;

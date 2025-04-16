const router = require("express").Router();
const faker = require("faker");
const mongoose = require("mongoose");
const Product = require("../models/product");
const Review = require("../models/review");

mongoose.connect("mongodb://localhost:27017/products");
router.get("/generate-fake-data", (req, res) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    product.save();
  }
  res.end();
});

router.get("/products", (req, res) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;

  let query = {};
  if (req.query.category) {
    query.category = req.query.category;
  }
  if (req.query.search) {
    query.$text = {
      $search: req.query.search,
      $caseSensitive: false,
      $diacriticSensitive: false,
    };
  }

  let sort = {};
  if (req.query.price == "lowest") {
    sort.price = 1;
  }
  if (req.query.price == "highest") {
    sort.price = -1;
  }

  Product.find(query)
    .sort(sort)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec()
    .then((products) => {
      res.send(products);
    })
    .catch((error) => {
      return console.error(error);
    });
});

router.get("/products/count", (req, res) => {
  let query = {};
  if (req.query.category) {
    query.category = req.query.category;
  }
  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }
  Product.find(query)
    .countDocuments()
    .then((count) => {
      res.send({ count: count });
    })
    .catch((error) => {
      return console.error(error);
    });
});

router.get("/products/:productId", (req, res) => {
  Product.find({ _id: req.params.productId })
    .exec()
    .then((product) => {
      res.send(product);
    })
    .catch((error) => {
      return console.error(error);
    });
});

router.get("/products/:productId/reviews", (req, res) => {
  const perPage = 4;
  const page = req.query.page || 1;

  Product.find({ _id: req.params.productId }, { reviews: 1 })
    .populate("reviews")
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec()
    .then((reviews) => {
      res.send(reviews);
    })
    .catch((error) => {
      return console.error(error);
    });
});

router.post("/products", (req, res) => {
  const product = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
  });

  product.save();
  res.end();
});

router.post("/products/:productId/reviews", (req, res) => {
  const product = Product.find({ _id: req.params.productId })
    .exec()
    .then((product) => {
      return product;
    })
    .catch((error) => {
      return console.error(error);
    });
  const review = new Review({
    userName: req.body.userName,
    text: req.body.text,
    product: req.params.productID,
  });

  product.reviews.push(review);
  res.send({ message: "Review added" });
});

router.delete("/products/:productId", (req, res) => {
  Product.findByIdAndDelete({ _id: req.params.productId })
    .exec()
    .then((product) => {
      res.send({ message: `The following product was deleted: ${product}` });
    })
    .catch((error) => {
      return console.error(error);
    });
});

router.delete("/reviews/:reviewId", (req, res) => {
  Review.findByIdAndDelete({ _id: req.params.reviewId })
    .exec()
    .then((review) => {
      res.send({ message: `The following product was deleted: ${review}` });
    })
    .catch((error) => {
      return console.error(error);
    });
});

module.exports = router;

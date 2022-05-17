const express = require("express");
const router = require("express").Router();
const app = express();
const faker = require("faker");
const cors = require("cors");
const Product = require("../models/product");
const Review = require("../models/review");
app.use(express.json());
app.use(cors());

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

router.get("/products", (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  const perPage = 9;
  const page = req.query.page || 1;
  let category = req.query.category;
  let options = {};
  let filter = {};

  if (category) {
    filter.category = category;
  }

  if (req.query.query) {
    filter.$text = { $search: req.query.query };
  }

  //set up optional sort
  if (req.query.price === "highest") {
    options.sort = {
      price: -1,
    };
  } else if (req.query.price === "lowest") {
    options.sort = {
      price: 1,
    };
  }
  count = Product.countDocuments((err, c) => {
    console.log(`Count is ${c}`);
  });

  Product.find(filter, {}, options)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);
        res.send([{ products: products, count: count }]);
      });
    });
});

router.get("/products/:product", (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  Product.findById(req.params.product).exec((err, product) => {
    if (!product) {
      res.sendStatus(404);
    } else if (err) {
      next(err);
    }
    res.send(product);
  });
});

router.get("/products/:product/reviews", (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  Product.findById(req.params.product)
    .populate("reviews")
    .exec((err, product) => {
      if (!product) {
        res.sendStatus(404);
      } else if (err) {
        next(err);
      }

      res.send(product.reviews);
    });
});

router.post("/products", (req, res, next) => {
  let newProduct = new Product(req.body);

  newProduct.save((err, product) => {
    if (err) {
      next(err);
    }
    res.send(product);
  });
});

router.post("/products/:product/reviews", (req, res, next) => {
  Product.findById(req.params.product).exec((err, product) => {
    if (!product) {
      res.sendStatus(404);
    }

    if (product) {
      let newReview = new Review({
        userName: req.body.userName,
        text: req.body.text,
        product: req.params.product,
      });

      product.reviews.push(newReview);
      product.save();

      newReview.save((err, review) => {
        if (err) {
          next(err);
        }
        res.send(review);
      });
    }
  });
});

router.delete("/products/:product", (req, res, next) => {
  Product.deleteOne({ _id: req.params.product }).exec((err, product) => {
    if (!product) {
      res.sendStatus(404);
    } else if (err) {
      next(err);
    }
    res.send("Product deleted");
  });
});

router.delete("/reviews/:review", (req, res, next) => {
  Review.deleteOne({ _id: req.params.review }).exec((err, review) => {
    if (!review) {
      res.sendStatus(404);
    } else if (err) {
      next(err);
    }
    res.send("Review deleted");
  });
});

module.exports = router;

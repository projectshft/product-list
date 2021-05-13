const express = require('express');
const router = express.Router();
const faker = require("faker");
const Product = require("../models/product");

router.get("/products", (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;

  if (req.query.price) {
    let query = {};
    if (req.query.category) query['category'] = req.query.category
    if (req.query.query) query['name'] = req.query.query

    let sort = {};
    if (req.query.price == 'highest') sort['desc'] = req.query.price
    if (req.query.price == 'lowest') sort['asc'] = req.query.price;

    Product
      .find(query)
      .sort({ price: Object.keys(sort) })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((err, products) => {
        Product.count().exec((err, count) => {
          if (err) return next(err);

          res.send(products);
        });
      });
  }

  if (!req.query.price) {
    let query = {};
    if (req.query.category) query['category'] = req.query.category
    if (req.query.query) query['name'] = req.query.query

    Product
      .find(query)
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((err, products) => {
        Product.count().exec((err, count) => {
          if (err) return next(err);
          res.send(products);
        });
      });
  }
});

//tested
router.get("/products/:product", (req, res) => {
  Product.findById(req.params.product)
    .then(productFound => {
      if (!productFound) { return res.status(403).end(); }
      return res.status(200).json(productFound);
    })
    .catch(err => next(err))
});

//to retest
router.get("/products/:product/reviews", (req, res) => {
  Product.findById(req.params.product)
    .then(productFound => {
      if (!productFound) { return res.status(404).end(); }
      return res.status(200).json(productFound.reviews);
    })
    .catch(err => next(err))
});

// in porgress
// router.post("/products/:product/reviews", (req, res) => {
//   Review.create(req.body, function (err, review) {
//     if (err) {
//       return res.status(401);
//     }
//     res.status(200).json(review);
//   })
// });

//tested
router.post("/products", (req, res) => {
  Product.create(req.body, function (err, product) {
    if (err) {
      return res.status(401);
    }
    res.status(200).json(product);
  })
});

//tested
router.delete("/products/:product", (req, res) => {
  Product.findByIdAndRemove(req.params.product)
    .then(productFound => {
      if (!productFound) { return res.status(404).end(); }
      return res.status(200).json(productFound);
    })
    .catch(err => next(err))
});

// to be tested
router.delete("/reviews/:review", (req, res) => {
  Review.findByIdAndRemove(req.params.review)
    .then(reviewFound => {
      if (!reviewFound) { return res.status(404).end(); }
      return res.status(200).json(reviewFound);
    })
    .catch(err => next(err))
});

module.exports = router;



// router.get("/generate-fake-data", (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product();
//     product.category = faker.commerce.department();
//     product.name = faker.commerce.productName();
//     product.price = faker.commerce.price();
//     product.image = "https://via.placeholder.com/250?text=Product+Image";
//     product.save((err) => {
//       if (err) throw err;
//     });
//   }
//   res.end();
// })
const router = require("express").Router();
const { exec } = require("child_process");
const faker = require("faker");
const { Module } = require("module");
const { Product, Review } = require("../models/product");

router.get("/products", (req, res, next) => {

  const productsPerPage = 9;

  const defaultPage = req.query.page || 1;
  
  const filters = {};

  if(req.query.name && req.query.name !== '') {
    filters.$text = {$search: req.query.name};
  } 
  if(req.query.category) {
    filters.category = req.query.category;
  } 

  const sort = {};

  if(req.query.price) {
    sort.price = req.query.price
  }
  
  Product.find(filters)
    .skip(productsPerPage * defaultPage - productsPerPage)
    .limit(productsPerPage)
    .sort(sort)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
}); 

router.get("/products/:query", (req, res) => {
  let query = req.params.query;
  
  Product.find({$text: {$search: query}}, (err, result) => {
    if (err) {
      res.status(404).end();
    } else {
      res.send(result);
    }
  });
});

router
  .route("/products/:productId")
  .get((req, res) => {
    const { productId } = req.params;

    Product.findById(productId, (err, product) => {
      if (err) {
        res.status(404).end();
      } else {
        res.send(product);
      }
    });
  })
  .delete((req, res) => {
    const { productId } = req.params;

    Product.findById(productId, (err, product) => {
      if (err) {
        res.status(404).end();
      } else {
        res.send(product + 'deleted');
      }
    });
  });

router.get("/products/:productId/reviews", (req, res) => {
  const { productId } = req.params;

  Product.findById(productId).populate('reviews').exec((err, product) => {
    if (err) {
      res.status(404).end();
    } else {
      res.send(product.reviews)
    }
  })
});

router.post("/products/:productId/reviews", (req, res) => {
  const { productId } = req.params;

  Product.findById(productId, (foundProduct) => {
    const userName = req.body.userName;
    const text = req.body.text;
    const product = req.body.product;

    const newReview = new Review({
      userName,
      text,
      product,
    });

    newReview.save();
    foundProduct.reviews.push(newReview);
    foundProduct
      .save()
      .then(() => res.send(foundProduct))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

router.delete("/reviews/:reviewId", (req, res) => {
  const { reviewId } = req.params;

  Review.findById(reviewId, (err, review) => {
    if (err) {
      res.status(404).end();
    } else {
      res.send(review + 'deleted');
    }
  });
});

router.post("/products", (req, res) => {
  const category = req.body.category;
  const name = req.body.name;
  const price = req.body.price;
  const image = req.body.image;
  const reviews = [];

  const newProduct = new Product({
    category,
    name,
    price,
    image,
    reviews,
  });

  newProduct
    .save()
    .then(() => res.send(newProduct))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

//GET all products
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

//GET a specific product
router.get("/products/:product", (req, res, next) => {
  const {product} = req.params; 

  Product.find({_id: product})
    .exec((err, product) => {
      if (err) return next(err);

      res.send(product[0]);
    });
});

//GET all reviews for a specific product
router.get("/products/:product/reviews", (req, res, next) => {
  const perPage = 4;
  // return the first page by default
  const page = req.query.page || 1;
  const {product} = req.params; 

  Product.find({_id: product})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, product) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(product[0].reviews);
      });
    });
});

//POST a new product
router.post("/products", (req, res, next) => {
  const newProduct = new Product();
  newProduct.category = req.body.category;
  newProduct.name = req.body.name;
  newProduct.price = req.body.price;
  newProduct.image = req.body.image;
  newProduct.reviews = [];

  newProduct.save((err) => {
    if (err) return next (err);
  });
  res.end();
});

//POST a new review for a specific product
router.post("/products/:product/reviews", (req, res, next) => {
  const {product} = req.params;

  Product.find({_id: product})
  .exec((err, product) => {
    if (err) return next (err);
    
    product[0].reviews.push(req.body);
    product[0].save();
  });
  res.end();
});

module.exports = router;
const express = require('express');
const router = require("express").Router();
const faker = require("faker");
const mongoose = require("mongoose");
const Product = require("../models/product");
const Review = require("../models/review");
const bodyParser = require('body-parser');
const product = require('../models/product');
const { request } = require('express');
let query = Product.find();


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




//product id working
router.get('/product/:productId', (req, res) => {
  const id = req.params.productId;
  console.log(id, 'id')

  Product.findById(id)
    .exec((err, product) => {
      if (err) throw err;
      res.send(product);
      console.log(product, 'product');
      console.log(req.params.productId, 'product id');
  });
});



//working
router.get("/products/:productId/reviews", (req, res, next) => {
  const perPage = 4;
  const page = req.query.page || 1;

  const id = req.params.productId;
  console.log(id, 'id')
  

  Review.find({productId: { $in: [ 

    mongoose.Types.ObjectId(`${id}`)
    
    ]} })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Review.count().exec((err, count) => {
        if (err) return next(err);

        res.send(reviews);
        console.log(reviews, 'reviews');
      });
    });
});





//working
router.post("/products/:productId/reviews", (req, res) => {
  let newReview = new Review();

  newReview.userName = req.body.userName;
  newReview.text = req.body.text;
  newReview.productId = req.body.productId;

  const productId = req.params.productId;
  
console.log(productId, 'product id');
console.log(newReview.productId, 'new review id');

  if(productId === newReview.productId) {
    newReview.save((err) => {
      if (err) throw err;
    });
    // console.log(product.reviews, 'product reviews');
    // product.reviews.push(newReview);
    // console.log(product.reviews, 'product reviews, did it push?');
    res.send(newReview);

  }
});



//working
router.post("/products", (req, res) => {
  let newProduct = new Product();

  newProduct.name = req.body.name;
  newProduct.category = req.body.category;
  newProduct.price = req.body.price;
  newProduct.image = req.body.image;

  newProduct.save((err) => {
      if (err) throw err;
    });
  res.send(newProduct);
});



//working
router.delete("/products/:productId", (req, res) => {
  let productId = req.params.productId;
  Product
    .deleteOne({ _id: productId })
    .then(() => {
      res.send();
    });
});

//working delete object id of review
router.delete("/reviews/:review", (req, res) => {
  let reviewId = req.params.review;
  Review
    .deleteOne({ _id: reviewId })
    .then(() => {
      res.send();
    });
});




module.exports = router;
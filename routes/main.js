const express = require("express");
const router = require("express").Router();
const app = express();
const faker = require("faker");

const Product = require("../models/product");
const Review = require("../models/review");
app.use(express.json());
//add function to build out categories to call in queries that ///use categories

//create multiple router files? 

//function to find product and avoid repetition?
const findProduct = (req) => {

}

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
  const perPage = 9;
  const page = req.query.page || 1;

  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products)
      });
    });
});

router.get("/products/:product", (req, res, next) => {
  Product.findById(req.params.product)
    .exec((err, product) => {
      if (product) {
        
       res.send(product) 
      } else if (err) {
        next(err)
      }
    })
})

router.get("/products/:product/reviews", (req, res, next) => {
  Product.findById(req.params.product)
    .populate("reviews")
    .exec((err, product) => {
      if (product) {
       res.send(product.reviews) 
      } else if (err) {
        next(err)
      }
    });    
});

router.post("/products", (req, res, next) => {
  let newProduct = new Product(req.body);

  newProduct.save((err, product) => {
    if (err) {
      next(err)
    } 
    res.send(product)
  });    
});

router.post("/products/:product/reviews", (req, res, next) => {
  let newReview = new Review({
    userName: req.body.userName,
    text: req.body.text,
    product: req.params.product
  });

  newReview.save((err, review) => {
    if (err){
      next(err)
    }
    res.send(review)
  });  
});

module.exports = router;
const mongoose = require("mongoose");
const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const ReviewSchema = require("../models/review");
const Review = mongoose.model("Review", ReviewSchema);
const _ = require('lodash');
const url = require('url');

// helper methods

const inputFormat = string => {
  let inputHandler = string.split(' ')
  let outputHandler = inputHandler.map((word) =>{
    let upper = word[0].toUpperCase();
    let lower = word.slice(1).toLowerCase();
    return upper+lower;
  })
  return outputHandler.join(' ')
}

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews = [];

    for (let i =0; i<6; i++){
      product.reviews.push({
        username: faker.internet.userName(),
        text: faker.lorem.sentence()
      })
    }

    product.save((err) => {
      if (err) throw err;
    });
  }
  // Product.find({_id: '609c1166508acb52c8c285be'}).deleteMany().exec((err, res)=>{
  //   console.log(res);
  // })
  res.end();
});

router.get("/products", (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;
  const priceSort = {}
  const query = {}
  let resultsCount

  req.query.category ? query.category = inputFormat(req.query.category) : null;
  req.query.query ? query.name = { $regex: req.query.query, $options: 'i'} : null;
  req.query.price === 'highest' ? priceSort.price = -1 : null;
  req.query.price === 'lowest' ? priceSort.price = 1 : null;
  
  Product.find(query).countDocuments((err, count)=>{
    if (err) return (err);
    resultsCount = count;
  })

  Product.find(query)
    .sort(priceSort)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
        res.send({count: resultsCount, products: [...products]});
    });
});

router.get("/products/:product", (req, res)=> {
  Product.find({_id: req.params.product})
    .exec((err, foundProduct)=>{
      if (err) {
        return res.send(err)
      }
      res.send(foundProduct)
  })
  
})


router.get("/products/:product/reviews", (req, res) => {
  const entries = (req.query.page - 1) * 4 || 0;
  Product.find({_id: req.params.product})
    .exec((err, foundProduct) => {
      if (err) {
        return res.send(err)
      }
      const reviewsPage = [];
      for (let i = entries; i < entries + 4; i++){
        if(!foundProduct[0].reviews[i]) {
          continue
        }
        reviewsPage.push(foundProduct[0].reviews[i])
      }
      if (reviewsPage.length === 0){
        return res.send ("404 not found: No reviews on page specified in query, try another page.")
      }
      res.send(reviewsPage)
    })
})

router.post("/products", (req, res) => {
  let newProduct = new Product();
  newProduct.category = req.body.category;
  newProduct.image = req.body.image;
  newProduct.name = req.body.name;
  newProduct.price = req.body.price;
  newProduct.reviews = req.body.reviews;
  
  newProduct.save((err) => {
    if (err) {
      return res.send(err);
    }
    res.send(`Successfully saved ${newProduct.name} to Database`)
  });
})


router.post("/products/:product/reviews", (req, res) => {
  let review = new Review();
  review.text = req.body.text;
  review.username = req.body.username;
  Product.find({_id: req.params.product})
    .exec((err, foundProduct) => {
      if (err) {
        return res.send(err)
      }
      let productReviewed = foundProduct[0];
      productReviewed.reviews.push(review);
      productReviewed.save((err)=>{
        if (err) {
          return res.send(err)
        }
      })
      res.send(`Successfully saved review for ${productReviewed.name} to Database`)
    })
})

router.delete("/products/:product", (req, res) => {
  Product.deleteOne({_id: req.params.product})
    .exec((err, foundProduct)=>{
    if (err) {
      return res.send(err)
      }
      res.send(`Successfully deleted ${req.params.product}`)
    })
})

router.delete("/reviews/:review", (req, res)=>{
  Product.find({"reviews._id": req.params.review})
    .exec((err, foundProduct)=>{
    if (foundProduct.length === 0) {
      return res.send("No review found for that ID")
      }
      foundProduct[0].reviews.pull({_id: req.params.review})
      foundProduct[0].save((err)=>{
        if (err) {
          return res.send(err)
        }
      })
      res.send(`Successfully deleted review ${req.params.review}`)
    })
})

module.exports = router;
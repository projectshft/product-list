const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/product");

router.param("product", function (req, res, next, id) {
  const query = Product.findOne({ _id: id });

  query.exec((err, product) => {
    if (err) return next(err);
    if (!product) return next(new Error("Can't find product."));

    req.product = product;
    next();
  });
});

router.param("review", function (req, res, next, id) {
  const reviewQuery = Review.findOne({ _id: id });

  reviewQuery.exec((err, review) => {
    if (err) return next(err);
    // if (!review) return next(new Error("Can't find review."));

    req.review = review;
    next();
  });
});

router.get("/products", (req, res, next) => {
  const perPage = 9;

  const page = req.query.page || 1;
  const category = req.query.category || null;
  const price = req.query.price || null;
  const query = req.query.query || null;

  const findObj = {};
  const priceObj = {};
  if (category) {
    findObj.category = category;
  }
  if (query) {
    findObj.name = new RegExp(query, "i");
  }
  if (price === 'highest') {
    priceObj.price = 'desc'
  }
  if (price === 'lowest') {
    priceObj.price = 'asc'
  } 
  
  Product.find(findObj)
    .skip(perPage * page - perPage)
    .sort(priceObj)
    .limit(perPage)
    .exec((err, products) => {
      res.send(products);
    })
});

router.get('/products/:product', (req, res, next) => {
  res.send(req.product);
});

router.get('/products/:product/reviews', (req, res, next) => {
  const reviews = req.product.reviews
  res.send(reviews);
});

router.post('/products', (req, res, next) => {
  const newProduct = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    reviews: []
  })
  newProduct.save();
  res.send(`Product added!`);
})

router.post('/products/:product/reviews', (req, res, next) => {
  const newReview = req.body;
  const reviewsArray = req.product.reviews;
  reviewsArray.push(newReview);
  req.product.save();
  res.send(`Review added!`);
})

router.delete('/products/:product', (req, res, next) => {
  const id = req.params.product;
  Product.deleteOne({_id:id}).exec((err, product) => {
    res.send(`Product deleted!`);
  })
})

router.delete('/products/:product/reviews/:review', (req, res, next) => { 
  const reviewId = req.params.review;
  const reviewsArray = req.product.reviews;
  
  Review.findByIdAndDelete(reviewId).exec((err, review) => {
    res.send(`deleted`);
    req.product.save();
  })
})

module.exports = router; 
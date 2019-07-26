const router = require('express').Router();
const Product = require('../models/product');
const Review = require('../models/review');

//GET route with pagination
router.get('/', (req, res, next) => {
  let itemsPerPage = 9;
  let pageNumber = req.query.page || 1;
  let pageSkip = ((pageNumber * itemsPerPage) - itemsPerPage);
  Product.find().skip(pageSkip).limit(itemsPerPage).exec((err, result) => {
    Product.count().exec((err, count) => {
      if (err) throw err;
      res.send(result);
    })
  })
});

//GET route for /products/:productId
router.get('/:productId', (req, res, next) => {
  let { productId } = req.params;
  Product.find({ _id: productId }).exec((err, result) => {
    if (err) throw err;
    res.send(result);
  })
});

//POST route for /products (adds product to DB)
router.post('/', (req, res, next) => {
  let { category, name, price, image } = req.body;
  console.log(category, name, price, image);
  Product.create(req.body, function (err, result) {
    if (err) return handleError(err);
    // saved!
    res.send(result);
  });
});

//POST route for /products/:productId/reviews
router.post('/:productId/reviews', (req, res, next) => {
  let { productId } = req.params;
  let { author, reviewText } = req.body;
  let newReview = {
    author,
    reviewText,
    product: productId
  };
  Review.create(newReview, function (err, result) {
    if (err) return handleError(err);
    // saved!
    res.send(result);
  });
});

//DELETE route for /products/:productId
router.delete('/:productId', (req, res, next) => {
  let { productId } = req.params;
  Product.deleteOne({ _id: productId }).exec((err, result) => {
    if (err) throw err;
    res.send(result);
  })
});


module.exports = router;
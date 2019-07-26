const router = require('express').Router();
const Product = require('../models/product');
const Review = require('../models/review');

//GET route with pagination
router.get('/', (req, res, next) => {
  let itemsPerPage = 9;
  let pageNumber = req.query.page || 1;
  let pageSkip = ((pageNumber * itemsPerPage) - itemsPerPage);

  //let's add some sorting based on our query!
  const {category, price} = req.query;
  //adding in category query object
  let searchOptions = {};
  if (category) {
    let upperCaseCategory = category.slice(0,1).toUpperCase() + category.slice(1,(category.length)).toLowerCase();
    searchOptions['category'] = upperCaseCategory;
  }
  console.log(searchOptions);
  //we'll check our price sort as well
  let sortValue = {};
  if(price == 'highest'){
    sortValue['price'] = -1;
  } else if (price == 'lowest'){
    sortValue['price'] = 1;
  }

  console.log(sortValue);
  
  Product.find(searchOptions).skip(pageSkip).limit(itemsPerPage).sort(sortValue).exec((err, result) => {
    Product.count().exec((err, count) => {
      if (err) throw err;
      res.send(result);
    })
  })
});

//GET route for /products/:productId
router.get('/:productId', (req, res, next) => {
  let { productId } = req.params;
  //check here for incorrect productId format

  Product.find({_id: productId}).exec((err, result) => {
    if (err) throw err;
    res.send(result);
  })
});

//POST route for /products (adds product to DB)
router.post('/', (req, res, next) => {
  //checks below here for request body data validation
  let { category, name, price, image } = req.body;
  
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
  //checks below here for request body data validation


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
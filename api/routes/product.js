const router = require('express').Router();
const Product = require('../models/product');
const Review = require('../models/review');

//double-check our productId
router.param('productId', function (req, res, next) {
  let { productId } = req.params;
  //check here for incorrect productId format
  if (productId.length !== 24){
    res.status(404).send('Incorrect Product ID, please update and try again.');
  }
  else {
    Product.find({ _id: productId }).exec((err, result) => {
      if(result === undefined){
        res.status(404).send('Product not found, please check Product ID.');
      } else {
        req.product = result[0];
        next();
      }
    })
  }
});

//GET route with pagination
router.get('/', (req, res, next) => {
  let itemsPerPage = 9;
  let pageNumber = req.query.page || 1;
  let pageSkip = ((pageNumber * itemsPerPage) - itemsPerPage);

  //let's add some sorting based on our query!
  const {query, category, price} = req.query;
  //adding in category query object
  let searchOptions = {};
  let whereFunction = ``;
  if (category) {
    let upperCaseCategory = category.slice(0,1).toUpperCase() + category.slice(1,(category.length)).toLowerCase();
    searchOptions['category'] = upperCaseCategory;
  }

  if (query) {
    let splitQuery = query.split(' ');
    let upperCaseQuery = splitQuery.map(query => {
      return query.slice(0, 1).toUpperCase() + query.slice(1, (query.length)).toLowerCase()
    }).join(' ');
    searchOptions.$text = { $search: upperCaseQuery};
    console.log(searchOptions);
  }

  //we'll check our price sort as well
  let sortValue = {};
  if(price == 'highest'){
    sortValue['price'] = -1;
  } else if (price == 'lowest'){
    sortValue['price'] = 1;
  }

  Product.find(searchOptions).skip(pageSkip).limit(itemsPerPage).sort(sortValue).exec((err, result) => {
    Product.countDocuments().exec((err, count) => {
      if (err) throw err;
      res.status(200).send(result);
    })
  })
});

//GET route for /products/:productId
router.get('/:productId', (req, res, next) => {
  req.product ? res.status(200).send(req.product) : res.status(404).send('Product not found.');
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
  if (!req.product) {
    res.status(404).send('Product not found.')
  };

  let { author, reviewText } = req.body;
  //checks below here for request body data validation
  let newReview = new Review();
    newReview['author'] = author;
    newReview['reviewText'] = reviewText;
    newReview.product = req.product;
    newReview.save();
    req.product.reviews.push(newReview._id);

  Product.update({ _id: req.product._id }, { reviews: req.product.reviews }, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

//DELETE route for /products/:productId
router.delete('/:productId', (req, res, next) => {
  if(!req.product){
    res.status(404).send('Product not found.')
  };

  Product.deleteOne({ _id: req.product._id  }).exec((err, result) => {
    if (err) throw err;
    res.send(result);
  })
});


module.exports = router;
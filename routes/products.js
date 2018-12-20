const router = require('express').Router()
const querystring = require('querystring');
const Product = require('../models/product')
const Review = require('../models/review')
const url = require('url');
const checkPageNumber = require('../utils');

//look into middleware for handling errors

router.param('product', (req,res,next,id) => {
  Product.find({_id: id}, (err, product) => {
    if (err && err.name === 'CastError') {
      res.status(404);
      res.send('Product not found: invalid product ID');
    } else if (err) throw err
      else {
      req.product = product[0];
      next()
    }
  })
})

router.get('/', (req, res, next) => {
  //design decision - products returned at a time
  const productLimitPerPage = 10;
  //get the total number of products get the page number
  Product.find({}, (err, products) => {
    if (err) throw err;
    const totalProducts = products.length;
    //util function which returns 0 if there was an error, 1 if no page was specified, and the correct number if a valid page was specified
    const page = checkPageNumber(req, totalProducts, productLimitPerPage);
    if (page === 0) {
      res.status(404);
      res.send('Page not found');
    } else {
    //use mongoose's paginate package to return the requested page with a limit of 10 products
      Product.paginate({}, { page: page, limit: productLimitPerPage }, (err, products) => {
        res.send(products);
      })
    }
  })
});

router.post('/', (req,res) => {
  const { category, price, name, image } = req.body;
  const newProduct = new Product();
  newProduct.category = category;
  newProduct.price = price;
  newProduct.name = name;
  newProduct.image = image;
  newProduct.reviews = [];
  //name and price are required, category and image have defaults if not provided
  if (!name) {
    res.status(400)
    res.send('Product name is required');
  }
  if (!price) {
    res.status(400)
    res.send('Product price is required');
  }
  if (!category) {
    newProduct.category = '';
  }
  if (!image) {
    newProduct.image = 'http://lorempixel.com/640/480/cats';
  }

  newProduct.save(() => {
    res.send(newProduct._id);
  });
})


router.get('/:product', (req,res) => {
  //make sure there was a valid product provided
  if (!req.product) {
    res.status(404);
    res.send("Product not found");
  }
 res.send(req.product);
})

router.post('/:product/reviews', (req,res) => {
  const { text, userName } = req.body;
  const newReview = new Review();
  newReview.text = text;
  newReview.userName = userName;
  newReview.product = req.product;
  //both text and userName are required
  if (!text) {
    res.status(400);
    res.send('Review text required');
  }
  if (!userName) {
    res.status(400);
    res.send('Review userName required');
  }
  Product.findByIdAndUpdate(req.product._id, (err, product) => {
    if (err) throw err;
    product.reviews.push(newReview);
    newReview.save(() => {
      res.send(newReview._id);
    });
  })  
})

module.exports = router;

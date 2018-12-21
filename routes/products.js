const router = require('express').Router();
const qs = require('querystring');
const url = require('url');
const Product = require('../models/Product');
const Review = require('../models/Review');

// let products;
// Product.find({}, (err, prods) => {
//   if (err) throw err;
//   products = prods.map(p => p.toJSON());
// });

router.param('product', (req, res, next, id) => {
  Product.find({ _id: id }, (err, product) => {
    if (err) {
      res.status(404).send(`Product not found :(`);
    }

    req.product = product[0].toJSON(); // mongoose.find() returns array of cursors
    next();
  });
});

// router.param('review', (req, res, next, id) => {
//   Review.find({ _id: id }, (err, review) => {
//     if (err) throw err;

//     req.review = review;
//     console.log(req.review);
//     next();
//   });
// });

// GET all the products
router.get('/', (req, res, next) => {
  Product.find({}, (err, products) => {
    if (err) throw err;

    // Get max number of pages based on number of products
    const numProducts = products.length;
    const maxPages = Math.ceil(numProducts / 10);

    // Get page from URL
    const parsedURL = url.parse(req.originalUrl);
    let { page } = qs.parse(parsedURL.query);

    // User didn't specify page in query
    if (typeof page === 'undefined') {
      page = 1;
    } else {
      page = Number(page); // 'zebra' === NaN
    }

    // Page edge cases
    if (!page || page < 1 || page > maxPages) {
      res.status(404).send('Page not found!');
    } else {
      Product.paginate({}, { page, limit: 10 }, (err, products) => {
        res.send(products);
      });
    }
  });
});

// GET single product
router.get('/:product', (req, res) => {
  res.send(req.product);
});

// POST a new product
router.post('/', (req, res) => {
  const newProduct = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    reviews: []
  });
  newProduct.save();
  res.send({
    success: true,
    newProduct: newProduct
  });
});

// POST a new review
router.post('/:product/reviews', (req, res) => {
  console.log('REQ.PRODUCT', req.product);
  const newReview = new Review({
    userName: req.body.userName,
    text: req.body.text,
    product: req.product
  });
  newReview.save();
  req.product.reviews.push(newReview);
  res.send({
    success: true,
    newReview: newReview
  });
});

// DELETE product by id
router.delete('/:product', (req, res) => {
  Product.findOneAndDelete({ _id: req.product._id }, (err, product) => {
    if (err) throw err;

    // Delete review docs
    product.reviews.forEach(r => {
      Review.findOneAndDelete({ _id: r._id }, err => {
        if (err) throw err;
      });
    });

    res.send({ success: true });
  });
});

module.exports = router;

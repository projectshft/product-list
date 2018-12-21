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

// router.param('product', (req, res, next, id) => {
//   Product.find({ _id: id }, (err, product) => {
//     if (err) throw err;

//     req.product = product;
//     console.log(req.product);
//     next();
//   });
// });

router.param('review', (req, res, next, id) => {
  Review.find({ _id: id }, (err, review) => {
    if (err) {
      res.status(404).send(`Review not found :(`);
    }

    req.review = review[0].toJSON(); // mongoose.find() returns array of cursors
    next();
  });
});

router.get('/', (req, res, next) => {
  Review.find({}, (err, reviews) => {
    if (err) throw err;

    // Get max number of pages based on number of reviews
    const numReviews = reviews.length;
    const maxPages = Math.ceil(numReviews / 10);

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
      res.status(404);
      res.send('Page not found!');
    } else {
      Review.paginate({}, { page, limit: 40 }, (err, reviews) => {
        res.send(reviews);
      });
    }
  });
});

router.get('/:review', (req, res) => {
  res.send(req.review);
});

// DELETE review by id
router.delete('/:review', (req, res) => {
  Review.findOneAndDelete({ _id: req.review._id }, (err, review) => {
    if (err) throw err;

    // Remove the review from the product reviews array
    Product.findOne({ _id: review.product._id }, (err, product) => {
      product.reviews.splice(product.reviews.indexOf(review._id), 1);
      product.save(() => {
        res.send({ success: true });
      });
    });
  });
});

module.exports = router;

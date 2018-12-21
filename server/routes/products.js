const router = require('express').Router();
const qs = require('querystring');
const url = require('url');
const Product = require('../models/Product');
const Review = require('../models/Review');

router.param('product', (req, res, next, id) => {
  Product.find({ _id: id }, (err, product) => {
    if (err) {
      res.status(404).send(`Product not found :(`);
    }

    req.product = product[0].toJSON(); // mongoose.find() returns array of cursors
    next();
  });
});

// GET products
router.get('/', (req, res) => {
  // Get page, category, and price sort from URL
  const parsedURL = url.parse(req.originalUrl);
  let { page, category, price } = qs.parse(parsedURL.query);

  // Determine price sort order
  let sortOrder = price === 'highest' ? -1 : 1;

  // User didn't specify page in query
  typeof page === 'undefined' ? (page = 1) : (page = Number(page)); // 'zebra' === NaN

  Product.paginate({}, { page, limit: 9 }, (err, products) => {
    if (err) throw err;

    // Both category and price filters
    if (category && price) {
      Product.paginate(
        { category },
        { page, limit: 9, sort: { price: sortOrder } },
        (err, products) => {
          if (err) throw err;

          // Check page is valid
          if (!page || page < 1 || page > products.pages) {
            res.status(404).send('Page not found');
          } else {
            products.total === 0
              ? res.status(404).send('Category not found :(')
              : res.send(products);
          }
        }
      );
    }
    // Only category filter
    else if (category) {
      Product.paginate({ category }, { page, limit: 9 }, (err, products) => {
        if (err) throw err;

        // Check page is valid
        if (!page || page < 1 || page > products.pages) {
          res.status(404).send('Page not found');
        } else {
          products.total === 0
            ? res.status(404).send('Category not found :(')
            : res.send(products);
        }
      });
    }
    // Only price filter
    else if (price) {
      Product.paginate(
        {},
        { page, limit: 9, sort: { price: sortOrder } },
        (err, products) => {
          if (err) throw err;

          // Check page is valid
          if (!page || page < 1 || page > products.pages) {
            res.status(404).send('Page not found');
          } else {
            products.total === 0
              ? res.status(404).send('No products found :(')
              : res.send(products);
          }
        }
      );
    } else {
      // Send all products
      res.send(products);
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

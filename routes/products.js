const router = require('express').Router();
const Product = require('../models/product');
const Review = require('../models/review');

// Query parameter function to return product given a product id in the path
router.param('product', (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) {
      console.log(err.message);
      return res.status(404).send('Product not found');
    }
    if (product) {
      req.product = product;
      next();
    } else {
      return res.status(404).send('Product not found');
    }
  });
});

// GET /products route - Returns products based on input criteria
router.get('/products', (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;
  const { category, query, price } = req.query;

  // Include category and/or search term in product query, if included in request
  const queryOptions = {};
  if (category) {
    queryOptions.category = category;
  }
  if (query) {
    queryOptions.$text = { $search: query };
  }

  // Sort found products by price, if included in request
  const sortOption = {};
  switch (price) {
    case 'lowest':
      sortOption.price = 'asc';
      break;
    case 'highest':
      sortOption.price = 'desc';
      break;
    default:
  }

  Product.find(queryOptions)
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort(sortOption)
    .exec((err, products) => {
      if (err) return next(err);
      if (products.length > 0) {
        Product.countDocuments(queryOptions, (err, count) => {
          if (err) return next(err);
          return res.send({
            productList: products,
            numProducts: count,
          });
        });
      } else {
        return res.send({
          // return empty productList array with numProducts of 0 if there are no search results
          productList: [],
          numProducts: 0,
        });
      }
    });
});

// GET /products/:product route - Returns a specific product by its id
router.get('/products/:product', (req, res) => {
  res.send(req.product);
});

// GET /products/:product/reviews route - Returns all the reviews for a product, limited to 4 per page
router.get('/products/:product/reviews', (req, res, next) => {
  const perPage = 4;
  const page = req.query.page || 1;
  Product.findById(req.product._id, 'reviews')
    .populate({
      path: 'reviews',
      perDocumentLimit: perPage,
      options: { skip: (page - 1) * perPage },
    })
    .exec((err, product) => {
      if (err) return next(err);
      if (product.reviews.length > 0) {
        return res.send(product.reviews);
      }
      // return empty reviews array if the given product has no reviews
      return res.send([]);
    });
});

// POST /products route - Creates a new product in the database
router.post('/products', (req, res, next) => {
  const product = new Product();
  const { category, name, price, image } = req.body;

  if (!category || !name || !price || !image) {
    return res.status(400).end('Incorrectly formatted request');
  }

  product.category = category;
  product.name = name;
  product.price = price;
  product.image = image;
  product.reviews = [];

  product.save((err) => {
    if (err) throw err;
  });
  res.send(product);
});

// POST /products/:product/reviews route - Creates a new review in the database by adding it to the correct product's reviews array
router.post('/products/:product/reviews', (req, res) => {
  const review = new Review();
  const { userName, text } = req.body;

  if (!userName || !text) {
    return res.status(400).end('Incorrectly formatted request');
  }

  review.userName = req.body.userName;
  review.text = req.body.text;
  review.product = req.product._id;

  review.save((err) => {
    if (err) throw err;
  });

  Product.findByIdAndUpdate(
    req.product._id,
    { $push: { reviews: review } },
    { new: true },
    (err) => {
      if (err) throw err;
    }
  );
  res.send(review);
});

// DELETE /products/:product route - Deletes a product document by its id and the product's associated review documents
router.delete('/products/:product', (req, res) => {
  Product.findByIdAndDelete(req.product._id, (err, product) => {
    if (err) throw err;
    product.reviews.forEach((reviewId) => {
      Review.findByIdAndDelete(reviewId, (err) => {
        if (err) throw err;
      });
    });
    res.send(product);
  });
});

module.exports = router;

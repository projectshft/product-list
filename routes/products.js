const { Router } = require('express');
const { Product } = require('../models/product');
const { Review } = require('../models/review');

const router = Router();

// GET - all products, query params for page# & filter by category
router.get('/', (req, res) => {
  const numberOfProductsPerPage = 9;
  // If there are query parameters, get page number specified
  const page = req.query.page || 1;
  // ... and category and price
  const { category, price } = req.query;

  const errors = {};

  let productsQuery;
  let countQuery;

  // Find all products if no category specified
  if (!category) {
    productsQuery = Product.find();
    countQuery = Product.find().countDocuments();
  }

  // Filter by category if the query is found
  if (category) {
    productsQuery = Product.find({ $text: { $search: `${category}` } });
    countQuery = Product.find({ $text: { $search: `${category}` } }).countDocuments();
  }

  // Get total count and add to response
  const response = {};

  countQuery
    .then(results => {
      if (!results) {
        errors.notfound = 'No products found.';
        return res.status(404).send(errors);
      }
      response.count = results;
    })
    .catch(err => {
      if (err) throw err;
    });

  if (price || price === '') {
    // validate query input is formatted correctly
    if (price === '') {
      errors.request = "Price parameter must equal either 'highest' or 'lowest'.";
      return res.status(400).send(errors);
    }

    if (price !== 'highest' && price !== 'lowest') {
      errors.request = "Price parameter must equal either 'highest' or 'lowest'.";
      return res.status(400).send(errors);
    }
    // Sort by price if the query is found
    if (price === 'highest') {
      productsQuery.sort('-price');
    }

    if (price === 'lowest') {
      productsQuery.sort('price');
    }
  }

  productsQuery
    .skip(numberOfProductsPerPage * (page - 1))
    .limit(numberOfProductsPerPage)
    .populate('reviews')
    .then(products => {
      response.products = products;
      res.send(response);
    })
    .catch(err => {
      if (err) {
        errors.query = 'Unable to complete query, please check query parameters and try again.';
        return res.status(400).send(errors);
      }
    });
});

// POST - create and save a new product
router.post('/', (req, res) => {
  // create new product using values in the request body
  const errors = {};

  const { category, name, price } = req.body;
  Product.create(
    {
      category,
      name,
      price,
      // placeholder image
      image: 'https://picsum.photos/200'
    },
    (err, product) => {
      if (err) {
        errors.dbError = err.message;
        return res.status(400).send(errors);
      }
      res.send(product);
    }
  );
});

// GET - list of categories
router.get('/categories/all', (req, res) => {
  const errors = {};

  Product.find().distinct('category', (err, categories) => {
    if (err) {
      errors.categories = 'Unable to get categories';
      res.status(404).send(errors);
    }
    categories.sort();
    res.send(categories);
  });
});

// GET - get product by productId
router.get('/:productId', (req, res) => {
  const errors = {};
  // Obtain productId from params
  const { productId } = req.params;
  // Query database for product matching the id
  Product.findById(productId, (err, product) => {
    if (err) {
      errors.query = 'Unable to locate document with that ID';
      return res.status(404).send(errors);
    }

    if (!product) {
      errors.query = 'Unable to locate document with that ID';
      return res.status(404).send(errors);
    }
    res.send(product);
  });
});

// DELETE - delete product by productId
router.delete('/:productId', (req, res) => {
  const errors = {};
  // Obtain productId from params
  const { productId } = req.params;
  // Query database for matching id and delete Item
  Product.findByIdAndDelete(productId, (err, product) => {
    if (err) {
      errors.query = 'Unable to locate document with that ID';
      return res.status(404).send(errors);
    }
    res.write(`Deleted product id: ${product._id}.`);
    // Remove associated reviews
    product.reviews.forEach(review => {
      Review.findByIdAndDelete(review._id, (err, r) => {
        if (err) {
          errors.reviews = 'Unable to locate reviews to delete';
          res.status(404).send(errors);
        }
        res.write(`Deleted review id: ${r._id}.`);
      });
    });
  });
  res.send('Product and all associated reviews deleted.');
});

module.exports = router;

const { Router } = require('express');
const { Product } = require('../models/product');

const router = Router();

// GET - all products, query params for page# & filter by category
router.get('/', (req, res) => {
  const numberOfProductsPerPage = 10;
  // If there are query parameters, get page number specified
  const page = req.query.page || 1;
  // ... and category
  const { category } = req.query;
  // ... and price
  const { price } = req.query;

  let productsQuery;

  // Find all products if no query specified
  if (!category) {
    productsQuery = Product.find();
  }

  // Filter by category if the query is found
  if (category) {
    productsQuery = Product.find({ $text: { $search: `${category}` } });
  }

  // Sort by price if the query is found
  if (price) {
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
    .exec((err, products) => {
      if (err) throw err;
      res.send(products);
    });
});

// POST - create and save a new product
router.post('/', (req, res) => {
  // create new product using values in the request body
  Product.create(
    {
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      image:
        'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    },
    (err, product) => {
      if (err) throw err;

      res.send(product);
    }
  );
});

// GET - get product by productId
router.get('/:productId', (req, res) => {
  // Obtain productId from params
  const { productId } = req.params;
  // Query database for product matching the id
  Product.findById(productId, (err, product) => {
    if (err) throw err;
    res.send(product);
  });
});

// DELETE - delete product by productId
router.delete('/:productId', (req, res) => {
  // Obtain productId from params
  // Query database for matching id
  // Delete Item
  // Remove associated reviews?
});

module.exports = router;

const { Router } = require('express');
const { Product } = require('../models/product');

const router = Router();

// GET - all products, query params for page#
router.get('/', (req, res) => {
  const numberOfProductsPerPage = 10;
  // If there are query parameters, get page number specified

  const page = req.query.page || 1;

  Product.find()
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
  const product = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image:
      'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
  });

  product.save(err => {
    if (err) throw err;
  });
  res.send('Item added');
});

// GET - get product by productId
router.get('/:productId', (req, res) => {
  // Obtain productId from params
  // Query database for product matching the id
});

// DELETE - delete product by productId
router.delete('/:productId', (req, res) => {
  // Obtain productId from params
  // Query database for matching id
  // Delete Item
  // Remove associated reviews?
});

module.exports = router;

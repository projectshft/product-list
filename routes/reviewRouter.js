const router = require('express').Router();
const Product = require('../models/product');

// all routes to 'products/:productId/reviews'
router
  .route('/')
  .get((req, res, next) => {
    const { productId } = req.params;
    Product.findById(productId, (err, product) => {
      if (err) {
        res.status(404).end();
      } else {
        res.send(product);
      }
    });
  })
  .post();

module.exports = router;

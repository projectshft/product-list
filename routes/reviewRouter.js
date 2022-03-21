const router = require('express').Router({ mergeParams: true });
const { Product, Review } = require('../models/product');

// all routes to 'products/:productId/reviews'
router
  .route('/')
  .get((req, res) => {
    const { productId } = req.params;

    Product.findById(productId, (err, product) => {
      if (err) {
        res.status(404).end();
      } else {
        res.send(product.reviews);
      }
    });
  })
  .post((req, res) => {
    const { productId } = req.params;
    const { testReview } = req.body;
    const { username, text } = testReview;

    Product.findById(productId, async (err, product) => {
      const reviewToAdd = new Review();
      reviewToAdd.username = username;
      reviewToAdd.text = text;

      product.reviews.push(reviewToAdd);
      product.save((err) => {
        if (!err) {
          res.send(reviewToAdd);
        } else {
          res.status(404).end();
        }
      });
    });
  })
  .delete((req, res) => {
    const productId = '62363fd4f3dcee005debc4cf'; // req.params;
    const { reviewIdToDelete } = req.body;

    Product.findById(productId, (err, product) => {});

    // const doesProductExistBefore = await Product.exists({ _id: idToDelete });

    // if (!doesProductExistBefore) return res.status(400).end();

    // await Product.deleteOne({ _id: idToDelete });

    // const doesProductExistAfter = await Product.exists({ _id: idToDelete });

    // res.send(doesProductExistAfter);
  });

module.exports = router;

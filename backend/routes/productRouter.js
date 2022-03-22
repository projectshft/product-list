const router = require('express').Router();
const { Product } = require('../models/product');
const reviewRouter = require('./reviewRouter');

// was hoping to use this middleware, but couldn't figure it out

// router.param('productId', (req, res, next, productId) => {
//   Product.findById(productId, (err, product) => {
//     if (err) {
//       res.status(404).end();
//     } else {
//       req.product = product;
//     }
//   });
//   next();
// });

router.use('/:productId/reviews', reviewRouter);

router
  .route('/')
  .get((req, res, next) => {
    const perPage = 9;
    const page = req.query.page || 1;
    const { category, price, query } = req.query;

    const categoryQuery =
      category !== 'null'
        ? { category: category.charAt(0).toUpperCase() + category.slice(1) }
        : {};

    let priceSort;
    if (price === 'desc') {
      priceSort = -1;
    }

    Product.find(categoryQuery)
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort({ price: priceSort || 1 })
      .exec((err, products) => {
        Product.count().exec((err, count) => {
          if (err) return next(err);
          res.send(products);
        });
      });
  })
  .post(async (req, res) => {
    const { testProduct } = req.body;
    const { category, name, price, image } = testProduct;

    const doesProductExist = await Product.exists({ name });

    if (doesProductExist) return res.status(400).end();

    const productToAdd = new Product();

    if (testProduct._id) productToAdd._id = testProduct._id;
    productToAdd.category = category;
    productToAdd.name = name;
    productToAdd.price = price;
    productToAdd.image = image;

    productToAdd.save((err) => {
      if (err) throw err;
    });

    res.send(productToAdd);
  });

router
  .route('/:productId')
  .get((req, res) => {
    // res.send(req.product);
    const { productId } = req.params;

    Product.findById(productId, (err, product) => {
      if (err) {
        res.status(404).end();
      } else {
        res.send(product);
      }
    });
  })
  .delete(async (req, res) => {
    const idToDelete = req.params.productId;

    const doesProductExistBefore = await Product.exists({ _id: idToDelete });

    if (!doesProductExistBefore) return res.status(400).end();

    await Product.deleteOne({ _id: idToDelete });

    const doesProductExistAfter = await Product.exists({ _id: idToDelete });

    res.send(doesProductExistAfter);
  });

module.exports = router;

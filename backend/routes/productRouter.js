const router = require('express').Router();
const reviewRouter = require('./reviewRouter');
const { Product } = require('../models/product');

// finds a product by id on any route with the productId parameter
router.param('productId', (req, res, next, productId) => {
  Product.findById(productId, (err, product) => {
    if (err) {
      res.status(404).end();
    } else {
      req.product = product;
      next();
    }
  });
});

router.use('/:productId/reviews', reviewRouter);

router
  .route('/')
  .get((req, res, next) => {
    const perPage = 9;
    const page = req.query.page || 1;
    const { category, sort, searchQuery } = req.query;

    const capWords = (str) => {
      const strArr = str.split(' ');
      const capArr = [];
      strArr.forEach((word) =>
        capArr.push(word.charAt(0).toUpperCase() + word.slice(1))
      );
      return capArr.join(' ');
    };

    const mongoQuery = {};
    if (category) mongoQuery.category = capWords(category);
    if (searchQuery) mongoQuery.name = new RegExp(capWords(searchQuery), 'i');

    let priceSort;
    if (sort === 'desc') {
      priceSort = -1;
    }

    Product.find(mongoQuery)
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort({ price: priceSort || 1 })
      .exec((err, products) => {
        Product.count(mongoQuery).exec((err, count) => {
          const pageCount = Math.ceil(count / 9);
          if (err) return next(err);
          res.send({ productCount: count, pageCount, products });
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
    res.send(req.product);
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

const router = require('express').Router();
const mongoose = require('mongoose');

const Product = require('../models/product');
const Review = require('../models/review');

router.param('productId', async (req, res, next, id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    const product = await Product.findById(id);
    req.product = product;
  } else {
    console.error(`Invalid id: ${id}`);
  }

  next();
});

router.get('/', (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 9;
  const { category, price, query } = req.query;

  let findQuery = {};
  if (category) {
    findQuery = { category, ...findQuery };
  }
  if (query) {
    findQuery = { name: new RegExp(query, 'i'), ...findQuery };
  }

  let sort = {};
  if (price) {
    if (price === 'highest') {
      sort = { price: -1 };
    }
    if (price === 'lowest') {
      sort = { price: 1 };
    }
  }

  Product.find(findQuery)
    .sort(sort)
    .skip(page * limit - limit)
    .limit(limit)
    .exec((error, products) => {
      if (error) throw error;
      Product.count(findQuery).exec((err, count) => {
        if (err) {
          throw err;
        }
        res.send({ numProducts: count, products });
      });
    });
});

router.post('/', (req, res) => {
  const product = new Product();

  product.category = req.body.category;
  product.name = req.body.name;
  product.price = req.body.price;
  product.image = 'https://via.placeholder.com/250?text=Product+Image';

  product.save((err, savedProduct) => {
    if (err) {
      const response = {
        error: true,
        message: err,
      };
      res.json(response);
    }

    res.send(savedProduct);
  });
});
router.get('/categories', (req, res) => {
  Product.find({}, 'category')
    .distinct('category')
    .exec((err, categories) => {
      if (err) throw err;
      res.send(categories);
    });
});

router.get('/:productId', (req, res, next) => {
  if (!req.product) {
    res.status(404).send('product not found');
  }

  res.send(req.product);
});

router.delete('/:productId', (req, res) => {
  Product.deleteOne({ _id: req.params.productId }, (err, product) => {
    if (err) {
      const response = {
        error: true,
        message: err,
      };
      res.json(response);
    }
    res.send(product);
  });
});

router.get('/:productId/reviews', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 4;

    await req.product.populate({
      path: 'reviews',
      options: {
        skip: page * limit - limit,
        limit,
      },
    });

    res.send(req.product.reviews);
  } catch (e) {
    console.error(e);
  }
});

router.post('/:productId/reviews', async (req, res) => {
  const review = new Review();

  review.username = req.body.username;
  review.text = req.body.text;
  review.product = req.product._id;

  req.product.reviews.push(review);

  req.product.save((err) => {
    if (err) {
      throw err;
    }
  });

  review.save((err, savedReview) => {
    if (err) {
      const response = {
        error: true,
        message: err,
      };

      res.json(response);
    }
    res.send(savedReview);
  });
});

module.exports = router;

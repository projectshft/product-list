const router = require('express').Router();
const { faker } = require('@faker-js/faker');
const { Product, Review } = require('../models/product');
const qs = require('querystring');

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = 'https://via.placeholder.com/250?text=Product+Image';

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

router.get('/products', (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;

  let priceSort;
  const price = req.query.price;
  if (price != 'highest' && price != 'lowest') {
    priceSort = {};
  } else {
    priceSort = { price: price == 'highest' ? 'desc' : 'asc' };
  }

  let categoryInput;
  const category = req.query.category || null;
  if (category !== null) {
    // let categoryTrans =
    //   category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    // categoryInput = { category: categoryTrans };
    categoryInput = { category: { $regex: category, $options: 'i' } };
  } else {
    categoryInput = {};
  }

  let queryInput;
  const query = req.query.query || null;
  if (query !== null) {
    queryInput = { name: { $regex: query, $options: 'i' } };
  } else {
    queryInput = {};
  }

  Product.find({ $and: [categoryInput, queryInput] })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort(priceSort)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);
        res.send({ products, count });
      });
    });
});

router.get('/products/:product', (req, res) => {
  Product.find({ _id: req.params.product }).exec((err, product) => {
    if (err) throw err;
    else res.send(product);
  });
});

router.get('/products/:product/reviews', (req, res) => {
  const perPage = 4;
  const page = req.query.page || 1;

  Product.find({ _id: req.params.product })
    .populate('reviews')
    .exec((err, product) => {
      if (err) {
        console.log(err);
      } else {
        res.send(
          product[0].reviews.slice(perPage * page - perPage, perPage * page)
        );
      }
    });
});

router.post('/products', (req, res) => {
  let newProduct = new Product(req.body);
  newProduct.save().then((err, data) => {
    res.send('This product has been saved to the database');
  });
});

router.post('/products/:product/reviews', (req, res) => {
  let review = new Review(req.body);
  review.save();
  // new Review(req.body).save();
  Product.find({ _id: req.params.product }).exec((err, product) => {
    product[0].reviews.push(review);
    product[0].save();
    res.send('Review added successfully!');
  });
});

router.delete('/products/:product', (req, res) => {
  Product.deleteOne({ _id: req.params.product }).exec((err, product) => {
    if (err) throw err;
    else res.send('Product successfully deleted');
  });
});

router.delete('/reviews/:review', (req, res) => {
  Review.deleteOne({ _id: req.params.review }).exec((err, review) => {
    if (err) throw err;
    else res.send('Review successfully deleted');
  });
});

module.exports = router;

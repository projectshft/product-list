const router = require('express').Router();
// const faker = require('faker');
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
  // return the first page by default
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
  if (typeof category != 'object' && category != 'null') {
    let categoryTrans =
      category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    categoryInput = { category: categoryTrans };
  } else {
    categoryInput = {};
  }

  let queryInput;
  const query = req.query.query || null;
  if (typeof query != 'object' && query != 'null') {
    queryInput = { name: { $regex: query, $options: 'i' } };
  } else {
    queryInput = {};
  }

  // if (category != 'null' && price != 'null') {
  //   categoryInput = { category: categoryTrans };
  //   priceSort = { price: price == 'highest' ? 'desc' : 'asc' };
  // }

  Product.find({ $and: [categoryInput, queryInput] })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort(priceSort)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment,
      // but in the future we might want to know how many are coming back
      // so we can figure out the number of pages
      // count the number of documents in a collection
      Product.count().exec((err, count) => {
        if (err) return next(err);
        // res.send(products);
        res.send({ ProductCount: products.length, products });
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
      if (err) throw err;
      else
        res.send(
          product.reviews.slice(perPage * page - perPage, perPage * page)
        );
    });
});

router.post('/products', (req, res) => {
  let newProduct = new Product(req.body);
  newProduct.save().then((err, data) => {
    if (err) throw err;
    else res.send('This product has been saved to the database');
  });
});

router.post('/products/:product/reviews', (req, res) => {
  Product.find({ _id: req.params.product }).exec((err, product) => {
    if (err) throw err;
    else {
      product.reviews.push(req.body);
      res.send('The review has been added');
    }
  });
});

router.delete('/products/:product', (req, res) => {
  Product.deleteOne({ _id: req.params.product }).exec((err, product) => {
    if (err) throw err;
    else console.log('Product successfully deleted');
  });
});

router.delete('/reviews/:review', (req, res) => {
  Review.deleteOne({ _id: req.params.review }).exec((err, review) => {
    if (err) throw err;
    else console.log('Review successfully deleted');
  });
});

module.exports = router;

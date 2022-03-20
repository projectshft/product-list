const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/product');

router.get('/', (req, res, next) => res.send('Server is running.'));

router.get('/products', (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;

  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);
        res.send(products);
      });
    });
});

router.get('/products/:productId', (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId, (err, product) => {
    if (err) {
      res.status(404).end();
    } else {
      res.send(product);
    }
  });
});

router.post('/products', (req, res, next) => {
  const { productToAdd } = req.body;

  productToAdd.save((err) => {
    if (err) throw err;
  });

  res.send(productToAdd);
});

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i += 1) {
    const product = new Product();

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

module.exports = router;

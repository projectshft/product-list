const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/product').Product;
const Review = require('../models/product').Review;

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

router.get('/products', (req, res, next) => {
  const perPage = 9

  // return the first page by default
  const page = req.query.page || 1

  Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Product.count().exec((err, count) => {
        if (err) return next(err)

        res.send(products)
      })
    })
})

router.get('/products/:id', (req, res, next) => {
  let productObject = Product.findById(req.params.id, (err, product) => {
    if (err) {
      return next(err)
    }
    res.send(product);
  });
});

router.post('/products', (req, res, next) => {
  let newProductObj = new Product(req.body);
  newProductObj.save()
  res.send(newProductObj)
});

router.post('/:productId/reviews', (req, res, next) => {
  let newReview = new Review();

  newReview.userName = req.body.userName;
  newReview.text = req.body.text;
  newReview.productId = req.params.productId;

  newReview.save()

  Product.findById(req.params.productId, (err, product) => {
      if (err) {
        //do soem error handling if you wnat
        return next(err)
      }
      product.reviews.push(newReview);
      product.save();
      res.send(newReview);
    });
});

module.exports = router
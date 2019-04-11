const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

// //Find ID of selected product
// router.param('product', function(req, res, next, id) {
//   req.product = Product.find(product => product.id === id);
//   next();
// });

// //Find ID of selected review
// router.param('review', function(req, res, next, id) {
//   req.review = Review.find(review => review.id === id);
//   next();
// })

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
  const perPage = 10

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

router.get('/products/:product', (req, res) => {
  Product
    .find({ _id: req.params.product })
    .exec((err, product) => {
      if (err) {
        return console.error(err)
      }
      res.send(product)
    })
});

router.get('/reviews', (req, res) => {
  const perPage = 40
  const page = req.query.page || 1

  Reviews
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      if (err) {
        return console.error(err)
      }
      res.send(reviews)
    });
});

module.exports = router

const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

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
  const perPage = 5
  const page = req.query.page || 1

  Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err)
        res.send(products)
      })
    })
});

router.get('/products/:id', (req, res, next) => {
  Product.findById(req.params.id, (err, product) => {
    if(err) { 
      return next(err)
    }
    res.send(product);
  });
});

router.get('/reviews', (req, res, next) => {
 Review
  .find({})
  .limit(5)
  .exec((err, reviews) => {
    Review.count().exec((err, count) => {
      if (err) return next(err)
      res.send(reviews)
    })
  })
});

// router.post('/products', (req, res, next) => {

// });

// router.post('/:productId/reviews', (req, res, next) => {

// });

// router.delete('/products/productId', (req, res, next) => {

// });

// router.delete('/reviews/:reviewId', (req, res, next) => {

// });



module.exports = router
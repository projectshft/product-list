const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/reviews')


router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()
    let review = new Reviews()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    //Reviews in database
    review.username = faker.name.firstName()
    review.text = faker.lorem.sentence()
    review.product = product._id
    product.reviews = review
    review.save((err) => {
      if (err) throw err
    })
    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
});

// creating paginating
//products endpoint
router.get('/products', (req, res, next) => {
  const perPage = 9

  // return the first page by default
  const page = req.query.page || 1
  // querying lesson
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
// reviews endpoint
router.get('/reviews', (req, res, next) => {
  const perPage = 40

  // return the first page by default
  const page = req.query.page || 1
  // querying lesson
  Review
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      Review.count().exec((err, count) => {
        if (err) return next(err)

        res.send(reviews)
      })
    })
})
// product id endpoint
router.get('/products/:product', (req, res, next) => {
  Product
    .findById(req.params.product)
    .limit(1)
    .exec((err, product) => {
      if (err) return next(err)

      res.send(product)
    });
});
//post - create a new product
router.post('/products', (req, res) => {
  let newProduct = new Product()

  newProduct.category = req.body.category
  newProduct.name = req.body.name
  newProduct.price = req.body.price
  newProduct.save((err) => {
    if (err) throw err
  })

  res.end();
});

//post - create a new product
router.post('/products', (req, res) => {
  let newProduct = new Product()

  review.username = req.body.use
  review.text = faker.lorem.sentence()
  review.product = product._id
  product.reviews = review
  review.save((err) => {
    if (err) throw err
  })

  res.end();
});




module.exports = router
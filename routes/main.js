const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const queryString = require('querystring')
const Review = require('../models/review')

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    let review = new Review();

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

    review.userName = faker.internet.userName();
    review.text = faker.lorem.sentence();

    product.save((err) => {
      if (err) throw err
    })

    review.save((err) => {
      if (err) throw err
    })
  }
  res.end('Success!')
})

//GET all products with a limit of 40 per page
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

//GET products by id
router.get('/products/:product', (req, res) => {
  const { product } = req.params;
  //this doesn't work :(
  if (!product) {
    res.writeHead(404, 'Product Not Found');
    return res.end("Product Not Found!");
  }
  Product.find({_id: product}).exec((err, product)=> {
    if (err) {
      console.log(err)
    }
    // res.writeHead(200, {"Content-Type": 'application/JSON'})
    return res.end(JSON.stringify(product))
  })
})

//GET all reviews with a limit of 40 per page
router.get('/reviews', (req, res, next) => {
  const perPage = 40

  // return the first page by default
  const page = req.query.page || 1

  Review
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Review.count().exec((err, count) => {
        if (err) return next(err)
        res.send(reviews)
      })
    })
})



module.exports = router



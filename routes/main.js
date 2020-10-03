const router = require('express').Router()
const { response } = require('express')
const faker = require('faker')
const Product = require('../models/product')

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://via.placeholder.com/250?text=Product+Image'

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

// gets the list of products
router.get('/products', (req, res, next) => {
  const perPage = 9

  // return the first page by default
  const page = req.query.page || 1
  // optional queries to filter products by
  const category = req.query.category;
  const price = req.query.price;
  const search = req.query.search;
  let query = {};
  let sortPrice = {};

  // if category query is sent, add the category query to our query object
  if(category) {
    query.category = category
  }
  // if price query is sent, add the price query to our sortPrice object
  if(price) {
    if (price === 'highest') {
      sortPrice.price = -1
    }
    if (price === 'lowest') {
      sortPrice.price = 1
    }
  }
  // if search query is sent, add the search query to our query object
  if(search){
    query.name = {$regex: search, $options: 'i'};
  }

  Product
    .find(query)
    .limit(perPage)
    .skip((perPage * page) - perPage)
    .sort(sortPrice)
    .exec((err, products) => {
      Product.find(query).countDocuments().exec((err, count) => {
        if (err) return next(err)
        else {
          let info = {};
          info.count = count
          info.products = products
          res.send(info)
        }
      })
    })
})

// get specific a product by its id
router.get('/products/:product', (req, res, next) => {
    let productId = req.params.product

  Product
    .findById(productId).exec((err, product) => {
        if (err || product._id === null) {
            res.sendStatus(400)
        } else {
            res.send(product);
        }
    })
})

// get reviews for a specific product
router.get('/products/:product/reviews', (req, res, next) => {
    let productId = req.params.product

    const reviewsPerPage = 4
    // return the first page by default
    const page = req.query.page || 1
    // skips the correct amount of reviews
    const numberToSkip = ((page-1) * reviewsPerPage)

    Product.findById(productId, { reviews: {$slice: [numberToSkip, reviewsPerPage]}})
    .limit(reviewsPerPage)
    .exec((err, product) => {
        if (err || product._id === null) {
          res.sendStatus(400)
        } else {
              res.send(product.reviews)
          }
    })
})

// create a new product in the db
router.post('/products', (req,res, next) => {
    let product = new Product(req.body);
    product.save()
    res.send(product)
})

// create a new review in the db 
router.post('/products/:product/reviews', (req,res, next) => {
    let productId = req.params.product;
    let reviewToAdd = req.body;

  Product
    .findByIdAndUpdate(productId, { $push: {reviews: reviewToAdd}}).exec((err, product) => {
        if (err || product._id === null) {
            res.sendStatus(400)
        } else {
            res.send('review added');
        }
    })

})

//delete a product based on its id
router.delete('/products/:product', (req,res, next) => {
    let productId = req.params.product

    Product
      .findByIdAndUpdate(productId).exec((err, product) => {
                if (err || product._id === null) {
                res.sendStatus(400)
            } else {
                product.remove()
                res.send('removed');
            }
      })
})

//delete a review based on its id
router.delete('/reviews/:review', (req,res, next) => {
    let productId = req.body.productId;
    let reviewId = req.params.review;

    Product
      .findByIdAndUpdate(productId, { $pull: { reviews: {_id: reviewId}}}).exec((err, product) => {
                if (err || product._id === null) {
                res.sendStatus(400)
            } else {
                res.send('removed review');
            }
      })
})
module.exports = router
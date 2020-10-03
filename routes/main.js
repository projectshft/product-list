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

  Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort({_id: 'asc'})
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Product.count().exec((err, count) => {
        if (err) return next(err)

        res.send(products)
        console.log(products);
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
//*** NEEDS WORK */
// get reviews for a specific product
router.get('/products/:product/reviews', (req, res, next) => {
    let productId = req.params.product
    Reviews.findById(productId).exec((err, product) => {
        if (err) {
            throw err;
        } else {
            res.send(product.review)
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

})

//delete a product based on its id
router.delete('/products/:product', (req,res, next) => {
    let productId = req.params.product

    Product
      .findById(productId).exec((err, product) => {
          product.remove(err => {
                if (err || product._id === null) {
                res.sendStatus(400)
            } else {
                res.send('removed');
            }
          })
      })
})
module.exports = router
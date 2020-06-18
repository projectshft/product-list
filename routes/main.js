const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

// router.get('/generate-fake-data', (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product()

//     product.category = faker.commerce.department()
//     product.name = faker.commerce.productName()
//     product.price = faker.commerce.price()
//     product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

//     product.save((err) => {
//       if (err) throw err
//     })
//   }
//   res.end()
// })

router.get('/products', (req, res, next) => {
    const perPage = 9
  
    // return the first page by default
    const page = req.query.page || 1
  
    Product
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, products) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
        Product.count().exec((err, count) => {
          if (err) return next(err)
  
          res.send(products)
        })
      })
})

router.get('/products/:product', (req, res, next) => {
    // grab :product from the params
    productID = req.params.product
    // find the product based off of the productID
    Product
        .findOne({_id: productID}, (err, product) => {
            if (err) {
                console.log(err)
            }
            res.json(product)
        })
})

router.post('/products', (req, res, next) => {
    // create new product
    let newProduct = new Product()
    // fill out product's key object pairs from the request body
    newProduct.category = req.body.category
    newProduct.name = req.body.name
    newProduct.price = req.body.price
    newProduct.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    // save new product and console log any errors that occur
    newProduct.save((err, product) => {
        if (err) {
            console.log(err)
        }
        res.json('product saved')
    })
})

router.post('/products/:product/reviews', (req, res, next) => {
    // create new review
    let newReview = new Review;
    // fill out reviews's key object pairs from the request body
    newReview.userName = req.body.userName
    newReview.text = req.body.text
    // assign product based on params
    newReview.product = req.params.product

    newReview.save((err, review) => {
        if (err) {
            console.log(err)
        }
        res.json('review saved')
    })
})


module.exports = router
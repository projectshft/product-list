const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

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

router.get('/products/:product', (req, res) => {
  const prodId = req.params.product
  Product.findById(prodId).exec((err, prodResult) => {
    if (err) throw err
    else res.send(prodResult)
  })
})

router.get('/reviews', (req, res) => {
  const perPage = 40
  const page = req.query.page || 1

  Review
    .find()
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, revResults) => {
      if (err) throw err
      else res.send(revResults)
    })
})

// Generates Fake Data in database on request

// router.get('/generate-fake-data', (req, res, next) => {

//   for (let i = 0; i < 90; i++) {
//     let product = new Product()

//     // Create 0-3 dummy reviews for each product
//     let reviewCount = faker.random.number(3)
//     for (let j = 0; j < reviewCount; j++) {
//       let review = new Review()

//       review.userName = faker.name.findName()
//       review.text = faker.lorem.sentences()
//       review.product = product._id
//       review.save((err) => {
//         if (err) throw err
//       })
//       product.reviews.push(review)
//     }

//     product.category = faker.commerce.department()
//     product.name = faker.commerce.productName()
//     product.price = faker.commerce.price()
//     product.image = 'https://payload.cargocollective.com/1/16/530262/11823255/Itsthevibe---Image-not-found_3984.JPG'

//     product.save((err) => {
//       if (err) throw err
//     })
//   }
//   res.end()
// })

module.exports = router
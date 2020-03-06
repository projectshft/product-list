const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()
    let review = new Review({text: "Beautifully machine-crafted", userName: "Black-Knight"})

    review.save()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'http://www.beeville.net/fbcsweb/Texas_Outline.jpg'
    product.reviews.push(review)

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

router.get('/products', (req, res, next) => {req.query.q
  const queryVal = parseInt(req.query.q) || 0

  Product.find({}).skip(queryVal).limit(9).exec((err, products) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.send(err)}
    else res.json(products)
  })
})

router.get("/products/:productId", (req, res, next) => {
  Product.findOne({_id: req.params.productId}).exec((err, product) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.send(err)}
    else res.json(product)
  })
})

router.post("/products", (req, res, next) => {
  let product = new Product()

  product.category = req.body.category
  product.name = req.body.productName
  product.price = req.body.price
  product.image = req.body.imageUrl
  product.reviews = []

  product.save((err) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.send(err)
    }
  })

  res.send("Item succesfully added!")
})

router.get('/reviews', (req, res, next) => {req.query.q
  const queryVal = parseInt(req.query.q) || 0

  Review.find({}).skip(queryVal).limit(40).exec((err, reviews) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.send(err)}
    else res.json(reviews)
  })
})

// router.get("/reviews", (req, res, next) => {
//   Product.find({ reviews: req.params.reviews})
//     .populate('reviews')
//     .exec((err, book) => {
//       if (err) {
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.send(err)
//       } else {
//         res.send(book)
//       }
//     })
// })

module.exports = router
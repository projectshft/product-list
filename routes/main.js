const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()
    let review = new Review({text: "Beautifully machine-crafted", userName: "Black-Knight"})

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'http://www.beeville.net/fbcsweb/Texas_Outline.jpg'
    product.reviews.push(review)

    product.save((err) => {
      if (err) throw err
      else {
        review.product = product._id
        review.save((err) => {
          if (err) throw err
        })
      }
    })

  }
  res.end()
})

router.get('/products', (req, res, next) => {req.query.q
  const queryVal = parseInt(req.query.page) || 0

  search = {}

  if (req.query.category) {
    let category = req.query.category.charAt(0).toUpperCase() + req.query.category.substring(1)
    search.category = category
  }

  priceOrder = {}

  if (req.query.price) {
    if (req.query.price == "highest") {
      priceOrder.price = "desc"
    } else if (req.query.price == "lowest") {
      priceOrder.price = "asc"
    }
  }

  Product.find(search).sort(priceOrder).skip(queryVal).limit(9).exec((err, products) => {
      Product.find(search).count().exec((err, count) => {
        if (err) throw err
        else {
          res.send({products: products, count: count})
        }
      })
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
    } else {
      res.send("Item succesfully added!")
    }
  })
})

router.get('/reviews', (req, res, next) => {req.query.q
  const queryVal = parseInt(req.query.q) || 0

  Review.find({}).skip(queryVal).limit(40).exec((err, reviews) => {
    Review.count().exec((err, count) => {
      if (err) throw err
      else {
        res.send({reviews: reviews, count: count})
      }
    })
  })
})

router.post("/:productId/reviews", (req, res, next) => {
  let review = new Review()

  review.text = req.body.text
  review.userName = req.body.userName
  review.product = req.params.productId

  Product.findById(req.params.productId).exec((err, product) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.send(err)
    } else {
      review.save((err) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.send(err)
        } else {
          product.reviews.push(review)
          product.save()
          res.send("Review successfully added!")
        }
      })
    }
  })
})

router.delete("/products/:productId", (req, res, next) => {
  Product.findByIdAndRemove(req.params.productId, (err) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.send(err)
    } else {
      res.send("Item deleted!")
    }
  })
})

router.delete("/reviews/:review", (req, res, next) => {
  const reviewId = req.params.review
  Review.findById(reviewId)
    .populate("product")
    .exec((err, review) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.send(err)
      } else {
        Product.findById(review.product.id, (err, product) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.send(err)
          } else {
            product.reviews = product.reviews.filter((review) => {
              return review._id != req.params.review
              })

            product.save()

            Review.findByIdAndRemove(req.params.review, (err) => {
              if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.send(err)
              } else {
                res.send("Review deleted!")
              }
            })
          }
        })
      }
    })

})

router.post("/")

module.exports = router
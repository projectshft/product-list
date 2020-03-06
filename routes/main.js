const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()
    let review = new Review({ text: "This product is awesome!", userName: "Karen Ryan"})

    review.save()
    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    product.reviews.push(review)

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

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

router.get('/products/:product', (req, res, next) => {
  Product.find({ _id: req.params.product}).exec(( err, product) => {
    if(err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.send(err)}
     else {
       res.send(product)
     }
  })
})

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

router.post('/products', (req, res, next) => {

    let product = new Product({
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      reviews: []
  })
  product.save((err) => {
    if (err) {
      res.send(err)
    } else {
      res.send("Product was successfully added.")
    }
  })
})

router.post('/:product/reviews', (req, res, next) => {

  let review = new Review({
    userName: req.body.userName,
    text: req.body.text,
    product: req.params.product
  })

  Product.findById(req.params.product, function (err, product) { 
      if(err) {
        res.send(err) 
      } else {
        review.save((err, review) => {
          if(err) {
            review.send(err) 
          } else {
            product.reviews.push(review)
            product.save()
            res.send("Review was successfully added.")
          }
        })
      }
    })
  })

module.exports = router
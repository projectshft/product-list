const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')
const ObjectId = require('mongoose').Types.ObjectId


router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()
    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    let numReviews = Math.round(Math.random()*5)
    for (let i = 0; i<numReviews; i++) {
      let review = {}
      review.userName= faker.internet.userName()
      review.reviewText = faker.random.words(4)
      review.product = product.id
      product.reviews[i] = review
    }
    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

router.get('/products', (req, res, next) => {
  let pageLimit = 9
  let productsToSkip = req.query.page ? (parseInt(req.query.page)-1)*pageLimit : 0
  let categoryObj = req.query.category ? {category:req.query.category} : {}
  let sortOrder = null
  if (req.query.price) {
    sortOrder = (req.query.price == 'lowest') ? 'price' : '-price' 
  }
  Product.find(categoryObj).sort(sortOrder).skip(productsToSkip).limit(pageLimit).exec((error, products) => {
    res.send(products)
  })
})

router.get('/products/count', (req, res, next) => {
  let categoryObj = req.query.category ? {category:req.query.category} : {}
  Product.count(categoryObj, (error, count) => {
    res.send({count})
  })
})

router.get('/products/categories', (req, res, next) => {
  Product.distinct("category", (error, categories) => {
    res.send(categories)
  })
})

router.get('/products/:productId', (req, res, next) => {
  let productId = req.params.productId
  Product.find({_id:productId}, (error, product) => {
    res.send(product)
  })
})

router.post('/products', (req, res, next) => {
  let product = new Product()
  product.category = req.body.category
  product.name = req.body.name
  product.price = req.body.price
  product.image = req.body.image
  product.reviews = req.body.reviews
  product.save((err) => {
    if (err) throw err
  })
  res.send(product)
})

router.post('/:productId/reviews', (req, res, next) => {
  let productId = req.params.productId
  let review = {}
  review.userName = req.body.userName
  review.reviewText = req.body.reviewText
  review.product = productId
  Product.findById(productId, (err, product) => {
    if (err) throw err
    product.reviews.push(review)
    product.save()
  })
  res.end()
})

router.delete('/products/:productId', (req, res, next) => {
  let productId = req.params.productId
  Product.findById(productId).remove().exec( (err, product) => {
    if (err) throw err
  })
  res.end()
})

router.delete('/reviews/:reviewId', (req, res, next) => {
  let reviewId = ObjectId(req.params.reviewId)
  Product.update({},{ $pull: {reviews:{ _id: reviewId }}}, {multi: true} , (err, product)=> {
    if (err) throw err
  })
  res.end()
})

module.exports = router;
const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const { Review, ReviewSchema } = require('../models/review')

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    product.reviews = []

    for (let j = 0; j < 5; j++) {
      let newReview = new Review({
        userName: faker.internet.userName(),
        text: faker.lorem.sentence(),
        product: product._id
      })
      product.reviews.push(newReview)
    }

    product.save((error) => {
      if (error) { throw error }
    })  
  }
  res.end()
})

router.get('/products-count', (req, res, next) => {
  const productsByFilter = req.query.category ? { category: req.query.category } : {}
  Product.count(productsByFilter, (error, count) => {
    if (error) { throw error }
    res.send(`${count}`)
  })
})

router.get('/products-categories', (req, res, next) => {
  Product.find({})
    .distinct('category')
    .exec((error, categories) => {
      if (error) { throw error }
      res.send(categories.sort())
    })
})

router.get('/products', (req, res, next) => {
  const productsPerPage = 9;
  const pageNumber = req.query.page > 0 ? req.query.page : 1
  const productsByCategoryFilter = req.query.category ? { category: req.query.category } : {}
  const productsBySearchQuery = req.query.query ? { name: new RegExp(req.query.query, 'i')} : {}
  const productsByFilters = { ...productsByCategoryFilter, ...productsBySearchQuery }
  
  let sortFilter = ''
  if (req.query.price === 'highest') {
    sortFilter = '-price'
  } else if (req.query.price === 'lowest') {
    sortFilter = 'price'
  }

  Product.find(productsByFilters)
    .skip((productsPerPage * pageNumber) - productsPerPage)
    .limit(productsPerPage)
    .sort(sortFilter)
    .exec( (error, products) => {
      if (error) { throw error }
      res.send(products)
    })
})

router.get('/products/:product', (req, res) => {
  Product.findById(req.params.product, (error, product) => {
    if (error) { throw error }
    if (!product) {
      res.writeHead(404, 'Resource not found.')
      return res.end()
    }
    res.send(product)
  })
})

router.get('/reviews', (req, res, next) => {
  const reviewsPerPage = 40
  const pageNumber = req.query.page > 0 ? req.query.page : 1
  Product.find({})
    .select('reviews -_id')
    .exec( (error, productReviews) => {
      let reviewsArray = []
      productReviews.forEach( (product) => {
        reviewsArray = reviewsArray.concat(product.reviews)
      })
      let startIndex = (reviewsPerPage * pageNumber) - reviewsPerPage
      let endIndex = reviewsPerPage * pageNumber
      res.send(reviewsArray.slice(startIndex, endIndex))
    })
})

router.post('/products', (req, res, next) => {
  let fakerReviews = []
  Product.create({
    category: req.body.category || 'Uncategorized',
    name: req.body.name || 'New Product',
    price: req.body.price || 0,
    image: req.body.image || 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png',
    reviews: []
  }, (error, product) => {
    if (error) { throw error }
    for (let i = 0; i < 5; i++) {
      let newReview = new Review({
        userName: faker.internet.userName(),
        text: faker.lorem.sentence(),
        product: product._id
      })
      fakerReviews.push(newReview)
    }
    product.reviews = product.reviews.concat(fakerReviews)
    product.save()
  })
  res.writeHead(200, 'Success - added product')
  res.end()
})

router.post('/:product/reviews', (req, res, next) => {
  Product.findById(req.params.product, (error, product) => {
    if (error) { throw error }
    if (!product) {
      res.writeHead(404, 'Resource not found.')
      return res.end()
    }
    let newReview = {
      userName: req.body.userName || 'User',
      text: req.body.text || '',
      product: product._id
    }
    product.reviews.push(newReview)
    product.save((error) => {
      if (error) throw error
    })
    res.writeHead(200, 'Success - added review')
    res.end()
  })
})

router.delete('/products/:product', (req, res) => {
  Product.findOneAndRemove({ _id: req.params.product}, (error, product) => {
    if (error) { throw error }
    if (!product) {
      res.writeHead(404, 'Resource not found.')
      return res.end()
    }
    res.send(product)
  })
})

router.delete('/reviews/:review', (req, res) => {
  Product.findOne({ reviews: { $elemMatch: { _id: req.params.review }} }, (error, product) => {
    if (error) { throw error }
    if (!product) {
      res.writeHead(404, 'Resource not found.')
      return res.end()
    }
    const indexOfReviewToRemove = product.reviews.findIndex( (review) => {
      return review.id === req.params.review
    })
    const removedReview = product.reviews[indexOfReviewToRemove]
    product.reviews.splice(indexOfReviewToRemove, 1)
    product.save( (error) => {
      if (error) { throw error }
    })
    res.send(removedReview) 
  })
})

module.exports = router
const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

//

// GET /generate-fake-data --- generates products and reviews  
router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {

    let product = new Product()

    for (let i = 0; i < 3; i++) {
      let review = new Review()
      review.userName = faker.internet.userName()
      review.text = faker.commerce.productAdjective() + '!'
      review.product = product._id

      review.save((err) => {
        if (err) throw err
      })
      product.reviews.push(review)
    }

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = faker.image.imageUrl()

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

// GET /products --- returns all products (paginated)
router.get('/products', (req, res, next) => {
  const perPage = 9
  // return the first page if no page is specified, and 
  // return the max value of 1 and a given page (if it's specified)
  let page = Math.max(req.query.page || 1, 1)
  let productCount = 0
  let maxPages = 1
  // get category (for filter) and price (for sorting)  
  const category = req.query.category || ''
  const price = req.query.price || ''
  console.log(category, price)
  const filterCategory = (category.length > 0) ? { category: category } : {}

  const getSort = function (sortParam) {
    if (sortParam.toLowerCase() === 'lowest') {
      return { price: 'asc' }
    } else if (sortParam.toLowerCase() === 'highest') {
      return { price: 'desc' }
    } else {
      return {}
    }
  }
  const sortPrice = getSort(price)
  console.log(sortPrice)

  Product.countDocuments(filterCategory).exec((err, count) => {
    if (err) return next(err)
    console.log(count)
    // returns the max number of pages possible for given group of query results 
    maxPages = Math.max(Math.ceil(count / perPage), 1)
    page = Math.min(page, maxPages)
    productCount = count
    console.log(page)

    Product.find(filterCategory)
      .sort(sortPrice)
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, products) => {
        if (err) return next(err)
        res.send({
          count: productCount,
          page: page,
          maxPages: maxPages,
          category: category,
          price: price,
          products: products
        })
      })

    // res.send({ 
    //   count: productCount, 
    //   page: page
    // })
  })

  // Product
  //   .find(filterCategory) // filterCategory
  //   .skip((perPage * page) - perPage)
  //   .limit(perPage)
  //   .exec((err, products) => {
  //     // use `count` to know how many are coming back
  //     Product.countDocuments(filterCategory).exec((err, count) => { // filterCategory
  //       if (err) return next(err)
  //       console.log(count)
  //       res.send({
  //         products: products, 
  //         count: count
  //       })
  //     })
  //   })
})

// GET /products/:productId --- returns a specific product by its id
router.get('/products/:productId', (req, res, next) => {
  const { productId } = req.params
  Product.find({ _id: productId }, (err, product) => {
    if (err) return next(err)
    res.send(product)
  })
})

//GET /reviews --- returns all reviews (paginated)
router.get('/reviews', (req, res, next) => {
  const perPage = 40
  // return the first page by default
  const page = req.query.page || 1

  Review
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      // use `count` to know how many are coming back
      Review.count().exec((err, count) => {
        if (err) return next(err)
        res.send(reviews)
      })
    })
})

// POST /products --- creates a new product in the database
router.post('/products', (req, res, next) => {
  let product = new Product()
  product.category = req.body.category
  product.name = req.body.name
  product.price = req.body.price
  product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

  product.save((err) => {
    if (err) throw err
  })
  res.send(product)
})

// POST /:productId/reviews --- creates a new review in the database 
// by adding it to the correct product's reviews array 
router.post('/:productId/reviews', (req, res, next) => {
  const { productId } = req.params

  Product.findById(productId, (err, product) => {
    if (err) throw err

    let review = new Review()
    review.userName = req.body.userName
    review.text = req.body.text
    review.product = product._id
    review.save((err) => {
      if (err) throw err
    })

    product.reviews.push(review)

    product.save((err) => {
      if (err) throw err
      res.send(review)
    })
  })
})

// DELETE /products/:productId --- deletes a product by id
router.delete('/products/:productId', (req, res, next) => {
  const { productId } = req.params
  Product.deleteOne({ _id: productId }, (err) => {
    if (err) return next(err)
    res.send()
  })
})

// DELETE /reviews/:reviewId --- deletes a review by id
router.delete('/reviews/:reviewId', (req, res, next) => {
  const { reviewId } = req.params
  Review.deleteOne({ _id: reviewId }, (err) => {
    if (err) return next(err)
    res.send()
  })
})

module.exports = router
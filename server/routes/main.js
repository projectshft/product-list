const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

//generate fake data to populate store and database
router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image =
      'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

    product.save(err => {
      if (err) throw err
    })
  }
  res.end()
})
//returns all products with pagination
router.get('/products', (req, res, next) => {
  const perPage = 9

  // return the first page by default, otherwise the page specified in the query
  const page = req.query.page || 1

  const category = req.query.category
  const price = req.query.price

  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // if (category) {
      //   Product.find({ category })
      //     .skip(perPage * page - perPage)
      //     .limit(perPage)
      //     .exec((err, products) => {
      //       // if (price) {
      //       //   Product.find({ price })
      //       //     .skip(perPage * page - perPage)
      //       //     .limit(perPage)
      //       //     .sort({
      //       //       price: -1
      //       //     })
      //       //     .exec((err, products) => {
      //       //       //if there is a category and a price query, send products within that category and price
      //       //       res.send(products)
      //       //     })
      //       // }
      //       //if there is a category query, send products within that category
      //       res.send(products)
      //     })
      // }
      // if no category, send all products
      res.send(products)
    })
})

//helper method to abstract req.product by id
router.param('product', function(req, res, next, id) {
  Product.findById(id)
    .populate({ path: 'reviews' })
    .exec((err, product) => {
      if (err) {
        console.error(err)
      } else {
        req.product = product
      }
      next()
    })
})
//helper method to abstract req.review by id
router.param('reviews', function(req, res, next, id) {
  Review.findById(id)
    .populate({ path: 'productId' })
    .exec((err, review) => {
      if (err) {
        console.error(err)
      } else {
        req.review = review
      }
      next()
    })
})
//returns a specific product by it's id
router.get('/products/:product', (req, res) => {
  res.send(req.product)
}) //to test: http://localhost:8000/products/5cb09114355e8ea9024aeb1b

//returns ALL the reviews
router.get('/reviews', (req, res) => {
  //limit to 40 reviews at a time
  const perPage = 40

  //return the first page by default
  const page = req.query.page || 1

  Product.find({})
    .populate('reviews')
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      if (err) {
        console.error(err)
      } else {
        res.send(products.map(product => product.reviews))
      }
      // })
    })
})
//creates a new product in the database
router.post('/products', (req, res) => {
  let newProduct = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    reviews: req.body.reviews
  })

  //Only save if the product doesn't exist yet
  Product.findOne({ name: newProduct.name }, function(err, foundProduct) {
    if (!foundProduct) {
      newProduct.save((err, product) => {
        if (err) {
          console.error(err)
        } else {
          res.send({ success: true, product: product })
        }
      })
    }
  })
}) //to test: debugger & Postman send a new product in the body as JSON object

//creates a new review in the database by adding it to the correct product's review array
router.post('/:product/reviews', (req, res) => {
  let newReview = new Review(req.body)
  newReview.userName = req.body.userName
  newReview.text = req.body.text
  newReview.productId = req.body.productId

  req.product.reviews.push(newReview)
  req.product.save((err, product) => {
    if (err) {
      console.error(err)
    } else {
      res.send({ success: true, product: product })
    }
  })
}) //to test: debugger & Postman send a new review in the body as JSON object

//deletes a product by id
router.delete('/products/:product', (req, res) => {
  req.product.remove(err => {
    if (err) {
      console.error(err)
    } else {
      res.send({ success: true })
    }
  })
}) //to test: debugger & postman, delete request with product id in url

//deletes a review by id
router.delete('/reviews/:review', (req, res) => {
  req.review.remove(err => {
    if (err) {
      console.error(err)
    } else {
      res.send({ success: true })
    }
  })
}) //to test: debugger & postman, delete request with review id in url
module.exports = router

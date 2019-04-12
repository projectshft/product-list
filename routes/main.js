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

  // return the first page by default
  const page = req.query.page || 1

  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Product.estimatedDocumentCount().exec((err, count) => {
        if (err) return next(err)

        res.send(products)
      })
    })
})

//helper method to abstract req.product
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
  let newProduct = new Product(req.body)
  newProduct
    .save()
    .then(item => {
      res.send(`product saved to database`)
    })
    .catch(err => {
      res.status(400).send(`unable to save to database`)
    })
})

//creates a new review in the database by adding it to the correct product's review array
// router.post('/:product/reviews', (err, res) => {
//   let newReview = new Review(req.body)
//   newReview.save()
//   req.product.reviews.push(newReview)
// })
//deletes a product by id
// router.delete('/products/:product', (req, res) => {
//   Product.findOneAndRemove(id, options, callback)
// })

//deletes a review by id

module.exports = router

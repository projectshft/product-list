const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')
const cors = require('cors')

router.get('/products',(req, res, next) => {
  const perPage = 9
  // return the first page by default
  const page = req.query.page || 1
  const prodCat = req.query.category
  const priceSort = req.query.price

  // Setting initial product query based on URL
  let prodQuery = Product.find({})

  // If specified, edit product query to find by category
  // SELF NOTE category must be in correct case for this to function correctly
  if (prodCat) {
    prodQuery = Product.find({
      category: prodCat
    })
  }

  // If specified, edit product query to sort by price
  if (priceSort == 'highest') {
    prodQuery = prodQuery.sort('-price')
  } else if (priceSort == 'lowest') {
    prodQuery = prodQuery.sort('price')
  }

  prodQuery.skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.distinct("category").exec((err, categories) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
        Product.count().exec((err, totalProdCount) => {
            if (err) return next(err)
            res.send({products:products, prodCount: totalProdCount, categories:categories})
          // products.countDocuments().exec((err, numProductsQueried) => {
          //   if (err) return next(err)
          //   res.send({products:products, prodCount: totalProdCount, prodsQueried: numProductsQueried, categories:categories})
          // })
        })
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

router.post('/products', (req, res) => {
  // Destructure incoming product data from body
  const {
    category: prodCat,
    name: prodName,
    price: prodPrice,
    image: prodImage
  } = req.body

  // Create and save new product instance
  let product = new Product({
    category: prodCat,
    name: prodName,
    price: prodPrice,
    image: prodImage
  })
  product.save()
  res.send(product)
})

router.post('/:product/reviews', (req, res) => {
  const prodId = req.params.product

  // Destructure incoming product data from body
  const {
    userName: revUserName,
    text: revText,
    product: revProd
  } = req.body

  // Create and save new review instance
  let review = new Review({
    userName: revUserName,
    text: revText,
    product: prodId
  })
  review.save()

  // Push/save review to corresponding product instance
  Product.findById(prodId).exec((err, prodResult) => {
    if (err) throw err
    else {
      prodResult.reviews.push(review)
      prodResult.save()
      res.send(prodResult)
    }
  })
})

router.delete('/products/:product', (req, res) => {
  const prodId = req.params.product
  // Removes product in database
  Product.findByIdAndRemove(prodId).exec((err, prodDelete) => {
    if (err) throw err
    else res.send(prodDelete)
  })
})

router.delete('/reviews/:review', (req, res) => {
  const reviewId = req.params.review

  // Removes review in Reviews collection and
  // its reference within Products collection
  Review.findById(reviewId).exec((err, rev) => {
    if (err) throw err
    else {
      // Removing from Reviews
      rev.remove()
      // Updating corresponding product to "pull" the deleted review out
      Product.updateOne({
        _id: rev.product
      }, {
        $pull: {
          reviews: rev._id
        }
      }).exec((err, results) => {
        if (err) throw err
        else res.send(results)
      })
    }
  })
})


// Generates Fake Data in database on request

// router.get('/generate-fake-data', (req, res, next) => {

//   for (let i = 0; i < 90; i++) {
//     let product = new Product()

//     // Create 0-2 dummy reviews for each product
//     let reviewCount = faker.random.number(2)
//     for (let j = 0; j < reviewCount; j++) {
//       let review = new Review()

//       review.userName = faker.internet.userName()
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
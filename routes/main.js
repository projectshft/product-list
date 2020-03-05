const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')


// router.get('/generate-fake-data', (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product()
//     let review = new Review()
//     review.userName = 'Hannah'
//     review.text = faker.commerce.productAdjective()
    

//     product.category = faker.commerce.department()
//     product.name = faker.commerce.productName()
//     product.price = faker.commerce.price()
//     product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
//     product.reviews= []
//     product.reviews.push(review)
//     product.save((err) => {
//       if (err) throw err
//     })
//   }
//   res.end()
// })


//Returns the first 9 products unless page is specified in query
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

  //returns one product by id number
  router.get('/products/:product', (req, res, next) => {
    if (!req.params.product){
        res.
    }
    Product
      .findById(req.params.product)
      .exec((err, product) => {
        if (err) return next(err)
        res.send(product)
      })
    })

    router.get('/reviews', (req, res, next) => {
        const perPage = 9
  
        // return the first page by default
        const page = req.query.page || 1
        Product
          .find({})
          .skip((perPage * page) - perPage)
          .limit(perPage)
          .exec((err, products) => {
            Product.count().exec((err, count) => {
                if (err) return next(err)
        
                const allReviews = []
                for (p in products) {
                    allReviews.push(products[p].reviews)
                  }
                res.send(allReviews)
              })
          })
        })

module.exports = router


// we'll want to import our model and add some routes for filling our database with fake data.

const router = require('express').Router()
// this is a package that will help us populate our database with a bunch of fake data.
const faker = require('faker')
const Product = require('../models/product')


// Now if you fire up your server and make a GET request to localhost:8000/generate-fake-data, it will create and save 90 new products each time you do. You might only want to do this once or twice.
// Now check your database to see a products collection with all your data.
// router.get('/generate-fake-data', (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product()

//     product.category = faker.commerce.department()
//     product.name = faker.commerce.productName()
//     product.price = faker.commerce.price()
//     product.image = 'https://via.placeholder.com/250?text=Product+Image'

//     product.save((err) => {
//       if (err) throw err
//     })
//   }
//   res.end()
// })

// Next we'll create our paginating GET route. We'll want the client to be able to pass in any "page" they want to get a different set of products each time and limit them to only 10 products at one time. 
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
      // If you want to count all documents in a large collection, use the estimatedDocumentCount() function instead. If you call countDocuments({}), MongoDB will always execute a full collection scan and not use any indexes.
      Product.count().exec((err, count) => {
        if (err) return next(err)

        res.send(products)
      })
    })
})

module.exports = router
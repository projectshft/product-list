const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')

router.get('/generate-fake-data', (req, res, next) => {
    for (let i = 0; i < 90; i++) {
        let product = new Product()

        product.category = faker.commerce.department()
        product.name = faker.commerce.productName()
        product.price = faker.commerce.price()
        product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

        product.save((err) => {
            if (err) throw err
        })
    }
    res.end()
})

router.get('/products', (req, res, next) => {
    Product.find((error, products) => {
        res.send(products)
    })
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

// router.get('/products', (req, res, next) => {
//     const perPage = 9

//     // return the first page by default
//     const page = req.query.page || 1

//     Product
//         .find({})
//         .skip((perPage * page) - perPage)
//         .limit(perPage)
//         .exec((err, products) => {
//             // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
//             Product.count().exec((err, count) => {
//                 if (err) return next(err)

//                 res.send(products)
//             })
//         })
// })

// //returns a specific product by its id
// router.get('/products/:product', (req, res, next) => {

//  }


//  //returns all the reviews limited to 40 at a time, ability to pass in options
//  //page query to paginate
// router.get('/reviews')

// //creates new product in database
// router.post('/products')


// //creates new review in the database by adding to a products reviews array
// router.post('/:product/reviews')

// //deletes product by id
// router.delete('/products/:product')

// //deletes review by id
// router.delete()

module.exports = router
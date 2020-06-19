const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/reviews')

// router.get('/generate-fake-data', (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product()

//     product.category = faker.commerce.department()
//     product.name = faker.commerce.productName()
//     product.price = faker.commerce.price()
//     product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
//     product.reviews = []  

//     product.save((err) => {
//       if (err) throw err
//     })
//   }
//   res.end()
// })

router.get('/products', (req, res, next) => {
    const perPage = 9
  
    // return the first page by default
    const page = req.query.page || 1
  
    Product
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, products) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
        Product.count().exec((err, count) => {
          if (err) return next(err)
  
          res.send(products)
        })
      })
  })


router.get('/products/:product', (req, res) => {
  const { product } = req.params
  // const productToReturn = req.query.product

  Product.findById(product).exec((err, product) => {
      if (err) {
          return console.error(err);
      }
      res.send(product)
  })
})

//since this is post there will also be a body param
//requires params in the body and in the url 
//needs edge cases for if the body doesn't contain username & text
router.post('/products/:product/reviews', (req, res) => {
  const { product } = req.params
  const username = req.body.username
  const text = req.body.text

  Product.findById(product)
    .populate('Review')
    .exec((err, product) => {
    if (err) {
        return console.error(err);
    }

    let review = new Review(
      {
        userName: username,
        text: text,
        product: product._id
      }
    )
    
    product.reviews.push(review)
    // product.save();
    res.send(review) //right now this looks like it might be adding the review?

    
  })
})




module.exports = router
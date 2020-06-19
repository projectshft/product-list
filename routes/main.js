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

// will look like: /products?page=3
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

//GETS a product by its id
//ID required in url params
router.get('/products/:product', (req, res) => {
    const { product } = req.params
    // const productToReturn = req.query.product

    Product
      .findById(product)
      // .populate('Review')
      .exec((err, product) => {
        if (err) {
            return console.error(err);
        }
        res.send(product)
    })
})

//POSTS a new product in the database
//requires category, name, price, image in the body params
router.post('/products', (req, res) => {
    const category = req.body.category
    const name = req.body.name
    const price = req.body.price
    const image = req.body.image

    let product = new Product(
      {
        category: category,
        name: name,
        price: price,
        image: image, 
        reviews: []
      }
    )
    product.save()
    res.send(product)// dont need this, just checking it out 
})

//since this is post there will also be a body param
//requires product id in url and username and text in post body
//needs edge cases for if the body doesn't contain username & text
router.post('/products/:product/reviews', (req, res) => {
    const { product } = req.params
    const username = req.body.username
    const text = req.body.text

    Product
      .findById(product) //find the product by the id in the url
      .populate('reviews') //populate the review schema
      .exec((err, product) => {
      if (err) {
          return console.error(err);
      }

      let review = new Review(//create a new review based on the review schema including the post body and the product id
        {
          userName: username,
          text: text,
          product: product._id
        }
      )
    
    review.save()
    product.reviews.push(review) //push the new review to the product review array
    product.save() //save the product with the new review
    res.send(review) //

  })
})

//GETS reviews for designated product
//Requires product id in the url and optional page in query
// /products/reviews?page=3
router.get('/products/:product/reviews', (req, res) => {
  const { product } = req.params

  const perPage = 4

  const page = req.query.page || 1 //takes the optional page number in the query or defaults to the first page

  Product.findById(product)
    .skip((perPage * page) - perPage) //how to tell if this is working?
    .limit(perPage)
    .populate('reviews')
    .exec((err, product) => {
      if (err) {
        console.error(err);
      } else {
        res.send(product);
      }
    })

})




module.exports = router
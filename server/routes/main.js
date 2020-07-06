const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const ProductReview = require('../models/productreview')


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
    const perPage = 9

    //return the first page by default
    const page = req.query.page || 1

    Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((error, products) => {
      Product.count().exec((err, count) => {
          if (err) return next(err)
          
      
        res.send(products)
    })
  })
})

//GET /products/:product: Returns a specific product by its id




//GET /products/:product/reviews: Returns ALL the reviews for a product, but limited to 4 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an optional page query parameter to paginate.



//POST /products: Creates a new product in the database



//POST /products/:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.



//DELETE /products/:product: Deletes a product by id



//DELETE /reviews/:review: Deletes a review by id


module.exports = router
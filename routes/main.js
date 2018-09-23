const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

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
  
    // return the first page by default
    const page = req.query.page || 1
  
    Product
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, products) => {
        Product.count().exec((err, count) => {
          if (err) return next(err)
  
          res.send(products)
        })
      })
  })

//   GET /products/:product: Returns a specific product by it's id
router.get('/products/:product', (req, res, next) => {
    let productObject = Product.findById(req.params.id, (err, product) => {
        if (err) {

            return next(err)
        }
        res.send(product);
    })    
})

//   GET /reviews: Returns ALL the reviews, but limited to 40 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an options page query to paginate.
router.get('/reviews', (req, res, next) => {
    let reviewProduct = Product.findById(req.params.id)
    reviewProduct
    .find({})
    .limit()
    .exec((err, reviews) => {
        Review.count().exec((err, count) => {
          if (err) return next(err)
          res.send(reviews)
        })
      })
    });

//   POST /products: Creates a new product in the database
router.post('/products', (req, res, next) => {
    let newProduct = new Product(req.body); // ???
    newProduct.save()
    res.send(newProduct)
})

//   POST /:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.
router.post('/:product/reviews', (req, res, next) => {
    let newReview = new Review({
        book: book._id,
        review: []
    })
    res.send(newReview)
})

//   DELETE /products/:product: Deletes a product by id
router.delete('/products/:product', (req, res, next) => {
    Product.findByIdAndDelete(req.params.id, (err, product) => {
        if (err) {
            return res.status(500).send(err);
        }
        const response = {
          message: "Product Deleted",
        };
        return res.status(200).send(product);
      });
})

//   DELETE /reviews/:review: Deletes a review by id
router.delete('/reviews/:review', (req, res, next) => {
    Review.findByIdAndDelete(req.params.id, (err, review) => {
        if (err) {
            return res.status(500).send(err);
        }
        const response = {
          message: "Product Deleted",
        };
        return res.status(200).send(review);
      });
})

module.exports = router
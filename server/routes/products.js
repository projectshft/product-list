const router = require('express').Router()
const Product = require('../models/product')
const Review = require('../models/review')

// gets specific product by ID
router.get('products/:product', (req, res, next) => {
  Product
    .findById(req.params.id, (err, product) => {
      if (!err) {
        res.send(product);
      } else {
        console.log(err);
      }
    })
});

// get ALL products
router.get('/products', (req, res, next) => {
  const perPage = 9
  const category = req.query.category
  const priceSort = req.query.price


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
});

// creates new product
router.post('/products', (req, res, next) => {
  // create new instance of the Product model
  const newProduct = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    reviews: []
  })

  newProduct.save((err) => {
    if (err) throw err
  })

  res.send(`New product has been added! ${newProduct}`)
});

// creates new review for specific product
router.post('/products/:product/reviews', (req, res, next) => {
  Product
    .findById(req.params.id)
    .exec((err, product) => {
      // create new instance of the Review model
      const newReview = new Review({
        product: req.params.productId,
        userName: req.body.userName,
        text: req.body.text
      })
      newReview.save((err) => {
        if (err) throw err
      })
      product.reviews.push(newReview)
      product.save()
      res.send(`New review has been added! ${newReview}`)
    })
});

// deletes product by ID
router.delete('/products/:products', (req, res, next) => {

});

module.exports = router
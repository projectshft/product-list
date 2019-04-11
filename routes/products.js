const router = require('express').Router()
const Review = require('../models/review')
const Product = require('../models/product')

//Find ID of selected product
router.param('product', function(req, res, next, id) {
  Product.find({ _id : id}, (err, product) => {
    if (err) {
      res.status(404).send("Sorry, that product cannot be found")
    }
    next();
  })
});

//get all products
router.get('/products', (req, res, next) => {
  const perPage = 10
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

//get a specific product
router.get('/products/:product', (req, res) => {
  Product
    .find({ _id: req.params.product })
    .exec((err, product) => {
      if (err) {
        return console.error(err)
      }
      res.send(req.product)
    })
});

//post a new product
router.post('/products', (req, res) => {
  let newProduct = new Product({
    category : req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    reviews: []
  })
  newProduct.save()

  res.send(`The following product was successfully added: ${newProduct}`)
})

//delete a product
router.delete('/products/:product', (req, res) => {
  Product
    .deleteOne({ _id: req.params.product })
    .exec((err, product) => {
      if (err) {
        return console.error(err)
      }
      res.send(`${req.params} successfully deleted`)
    })
})

module.exports = router
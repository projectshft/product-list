const router = require('express').Router()
const Review = require('../models/review')
const Product = require('../models/product')

//Find ID of selected product
router.param('product', function(req, res, next, id) {
  
  next();
});

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

router.get('/products/:product', (req, res) => {
  Product
    .find({ _id: req.params.product })
    .exec((err, product) => {
      if (err) {
        return console.error(err)
      }
      res.send(product)
    })
});

router.post('/products', (req, res) => {
  let newProduct = new Product({
    category : req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image
  })


  newProduct.save()

  res.send(`The following product was successfully added: ${newProduct}`)
})

module.exports = router
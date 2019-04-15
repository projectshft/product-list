const router = require('express').Router()
const Review = require('../models/review')
const Product = require('../models/product')

//Find ID of selected product
router.param('product', function(req, res, next, id) {
  Product.find({ _id : id}, (err, product) => {
    if (err) {
      res.status(404).send("Sorry, that product cannot be found")
    }
    req.product = product[0]
    next();
  })
});

//get all products
router.get('/', (req, res, next) => {
  const perPage = 9
  // return the first page by default
  const page = req.query.page || 1

  const catQuery = req.query.category;
  const sort = req.query.sort;
  console.log(sort)

  //empty category query, if there is a category sent, set to new query
  let categoryQuery = {}
  if (catQuery) {
    const category = (catQuery[0].toUpperCase()) + catQuery.slice(1)
    categoryQuery = {category: category}
  }

  //empty sort query, if query sent, set to new sort
  let sortQuery = {}
  if (sort === 'low') {
    sortQuery = { price: 'asc'}
  } if (sort === 'high') {
    sortQuery = { price: 'desc'}
  }

  Product
    .find(categoryQuery)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort(sortQuery)
    .exec((err, products) => {
      Product.countDocuments().then((count) => {
        if (err) {
          return next (err)
        } else {
          res.send(products)
        }
      })
    })
});
//get a specific product
router.get('/:product', (req, res) => {
  res.send(req.product)
});

//post a new product
router.post('/', (req, res) => {
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

//post a new review to a product
router.post('/:product/reviews', (req, res) => {
  let newReview = new Review ({
    userName: req.body.userName,
    text: req.body.text,
    product: req.params.product
  })

  newReview.save()
  req.product.reviews.push(newReview)
  req.product.save()

  res.send(`The following review was successfully added: ${newReview}`)
})

//delete a product
router.delete('/:product', (req, res) => {
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
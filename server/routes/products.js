const router = require('express').Router()
const Product = require('../models/product')
const Review = require('../models/review')

// gets specific product by ID
router.get('/:product', (req, res, next) => {
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
router.get('/', (req, res, next) => {
  const perPage = 9
  // return the first page by default
  const page = req.query.page || 1
  const queryCategory = req.query.category;
  const sort = req.query.sort;

  // empty category query
  let categoryQuery = {}
  if (queryCategory) {
    const category = (queryCategory[0].toUpperCase()) + queryCategory.slice(1)
    categoryQuery = { category: category }
  }

  // empty sort query
  let sortQuery = {}
  if (sort === 'low') {
    sortQuery = { price: 'asc' }
  } if (sort === 'high') {
    sortQuery = { price: 'desc' }
  }

  Product
    .find(categoryQuery)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort(sortQuery)
    .exec((err, products) => {
      Product.countDocuments().then((count) => {
        if (err) {
          return next(err)
        } else {
          res.send(products)
        }
      })
    })
});

// creates new product
router.post('/', (req, res, next) => {
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
router.post('/:product/reviews', (req, res, next) => {
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
router.delete('/:product', (req, res, next) => {
  Review
    .findById(req.params.id)
    .exec((err, product) => {
      if (!err) {
        product.remove();
        res.send(`Delete Complete ${req.params.id}`);
      } else {
        console.log(err);
      }
    })
})


module.exports = router
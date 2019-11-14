const router = require('express').Router()
// const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')



  
  // get ALL products
  router.get('/products', (req, res, next) => {
    const perPage = 9
    // return the first page by default
    const page = req.query.page || 1
    const productCategory = req.query.category;
    const sort = req.query.price;

  //setting state
    let searchQuery = {}
    let sortQuery = {}

    if (productCategory) {
        searchQuery = {category: productCategory}}
  //price sorting function
    if (sort === 'highest') {
      sortQuery = { price: 'descending' }
    } if (sort === 'lowest') {
        sortQuery = { price: 'ascending' }
    }
  
    Product
      .find(searchQuery)
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .sort(sortQuery)
      .exec((err, products) => {
          // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back

        Product.count().then((count) => {
          if (err) { return next(err)} 
          else {res.send(products)}
        })
      })
  });
  
  router.get('/products/:product', (req, res, next) => {
    Product
      .findById(req.params.id, (err, product) => {
        if (!err) {
          res.send(product);
        } else {
            return res.status(404).send('Product not found.')
        }
      })
  });

  router.post('/products', (req, res, next) => {
  
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
    res.send(newProduct)
  });
  
  // creates new review for specific product
  router.post('/:product/reviews', (req, res, next) => {
    Product
      .findById(req.params.id)
      .exec((err, product) => {
    
        const newReview = new Review({
          userName: req.body.userName,
          text: req.body.text,
          product: req.params.productId
        })
        newReview.save((err) => {
          if (err) throw err 
        })
        //push to arrays created above
        product.reviews.push(newReview)
        product.save()
        res.send(newReview)
      })
  });
  
 
  router.delete('/products/:product', (req, res) => {
    Review
      .findByIdAndRemove(req.params.id)
      .exec((err, product) => {
        if (err) throw err 
        else res.send(product)
      })
  })
  
  
  module.exports = router
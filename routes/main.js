const router = require('express').Router()
const ObjectId = require('mongoose').Types.ObjectId
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')
const PRODUCTS_PER_PAGE = 9;
const REVIEWS_PER_PAGE = 40;

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

    let review = new Review()
    review.userName = faker.internet.userName();
    review.text = faker.lorem.sentence();
    review.save();
    product.reviews.push(review);
    review.product = product;
  }
  res.end()
})

router.get('/products', (req, res, next) => {
  let pageNum = req.query.page || 1;
  if (pageNum < 1){
    return res.status(400).send('Invalid page number.');
  } 
  Product.find()
    .skip((pageNum -1) * PRODUCTS_PER_PAGE)
    .limit(PRODUCTS_PER_PAGE)
    .exec((err, result) => {
      //access to total count for future use
      Product.countDocuments().exec((err, count) => {
        if (err) return next(err)

        res.send(result)
      })
    })
  })

router.get('/products/:product', (req, res, next) => {
  let id = req.params.product;
  if (!ObjectId.isValid(id)){
    return res.status(400).send('Invalid product Id.')
  }
  Product.findById(id)
    .exec((err, product) =>{
      if(!product){
        return res.status(404).send('Product not found.')
      }
      res.send(product);
    })
});

router.get('/reviews', (req, res, next) => {
  let pageNum = req.query.page || 1;
  if (pageNum < 1){
    return res.status(400).send('Invalid page number.');
  } 
  Review.find()
    .skip((pageNum -1) * REVIEWS_PER_PAGE)
    .limit(REVIEWS_PER_PAGE)
    .exec((err, result) => {
      //access to total count for future use
      Review.countDocuments().exec((err, count) => {
        if (err) return next(err)

        res.send(result)
      })
    })
  })

router.post('/products', (req, res, next) => {
  if (typeof req.body.category !== 'string' || typeof req.body.name !== 'string' || typeof req.body.price !== 'number' || typeof req.body.image !== 'string'){
    return res.status(400).send('Invalid request.')
  }
  let product = new Product()
  product.category = req.body.category
  product.name = req.body.name
  product.price = req.body.price
  product.image = req.body.image
  product.save((err) => {
    if (err) throw err
    res.send(product)
  })
});

router.post('/:product/reviews', (req, res, next) => {
  let id = req.params.product;
  if (!ObjectId.isValid(id) || !req.body.userName || ! req.body.text){
    return res.status(400).send('Invalid request.')
  }
  Product.findById(id)
  .exec((err, product) =>{
    if(!product){
      return res.status(404).send('Product not found.')
    } else{
      let review = new Review()
      review.userName = req.body.userName
      review.text = req.body.text
      review.product = product
      review.save()
      product.reviews.push(review)
      product.save((err, result) => {
        if (err) throw err
        res.send(product);
      })
    }
  })
});






module.exports = router
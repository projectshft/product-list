const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../models/product');
const Review = require('../models/review')


router.use((req, res, next) => {
  console.log(`The url is ${req.url}`)
  next();
})

router.param('productId', async (req, res, next, id) => {
  if(mongoose.Types.ObjectId.isValid(id)){
    const product = await Product.findById(id);
    req.product = product;
  } else {
    console.error(`Invalid id: ${id}`)
  }

  next();
})

router.get('/', (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 9;
  Product.find()
    .skip((Number(page) - 1) * 9)
    .limit(Number(limit))
    .exec((error, products) => {
      if (error) throw error;
      res.send(products)
    })
})

router.get('/:productId', (req, res, next) => {
  res.send(req.product);
})

router.get('/:productId/reviews', (req, res) => {
  req.product.populate('reviews', (err, populated) => {
    res.send(populated.reviews)
  })
})

module.exports = router;
const express = require('express')

const router = express.Router();

//GET All Products
router.get('/', (req, res) => {
  console.log('GET products.')
  res.json({message: "hello"})
})

//GET Specific Product
router.get('/:product', (req, res) => {
  console.log(`GET product ${req.params.product} `)
  res.send(`GET product ${req.params.product} `)
})

//GET all reviews for specific product
router.get('/:product/reviews', (req, res) => {
  console.log(`GET all reviews for ${req.params.product}`)
  res.send(`GET all reviews for ${req.params.product}`)
})

//POST a new product
router.post('/', (req, res) => {
  console.log(`POST a new product`)
  res.send(`POST a new product`)
})

//POST a new review to a specific product
router.post('/:product/reviews', (req, res) => {
  console.log(`POST a new review for product ${req.params.product}`)
  res.send(`POST a new review for product ${req.params.product}`)
})

//DELETE a product
router.delete('/:product', (req, res) => {
  console.log(`DELETE Product ${req.params.product}`)
  res.send(`DELETE Product ${req.params.product}`)
})

module.exports = router;
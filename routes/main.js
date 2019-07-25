const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

const ITEMS_PER_PAGE = 9;

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    product.reviews = []

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

router.get('/products', (req, res, next) => {
  const pageNum = req.query.page || 1;
  //validate pageNum - must be >= 1
  if (pageNum < 1) {
    return res.status(400).send('Invalid page number.');
  }

  const numItemsToSkip = (pageNum - 1) * ITEMS_PER_PAGE;
  
  Product.find()
    .skip(numItemsToSkip)
    .limit(ITEMS_PER_PAGE)
    .exec((err, products) => {
      if (err) throw err;

      Product.countDocuments()
        .exec((err, count) => {
          //now have access to total product count for future use
          if (err) return next(err);
          res.send(products);
        })
    })

    //add a review for testing
    
})

module.exports = router
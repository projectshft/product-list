const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')
// const cors = require('cors')

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

//populate fake data
    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

   

// populate reviews with same template as products
    let review = new Review()

    review.userName = faker.internet.userName()
    review.text = faker.lorem.text()
    review.save();
    product.reviews.push(review);
    review.product = product
    

  }

  res.end()
});

module.exports = router
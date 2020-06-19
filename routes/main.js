const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

var getRandomNumber = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'


    let numReviews = getRandomNumber(7);
    for(let i = 0; i < numReviews; i++) {
      let review = new Review({
        userName: faker.internet.userName(),
        text: faker.random.words(),
        product: product._id
      })
      review.save();
      product.reviews.push(review);
    }

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

router.get('/products', (req, res, next) => {
  const itemsPerPage = 9;
  const page = req.query.page || 1;
  Product.find()
    .populate('reviews')
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err)
        res.send(products);
      })
    })
  });


module.exports = router

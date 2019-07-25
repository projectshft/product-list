const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')
let randomNumberBetweenOneandTen = Math.floor(Math.random()*(10-1+1)+1);

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()
    //add a random number of reviews to the review array on each product
    for (let i = 0; i < randomNumberBetweenOneandTen; i++) {
    let review = new Review()
    review.userName = faker.internet.userName();
    review.text = faker.lorem.sentence();
    review.save();
    product.reviews.push(review);
}
    //add content to each product property
    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

router.get('/products', (req, res, next) => {
    const perPage = 9
  
    // return the first page by default
    const page = req.query.page || 1
  
    Product
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, products) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
        Product.countDocuments().exec((err, count) => {
            if (err) return next(err)
  
          res.send(products)
        })
      })
  })
  
router.get('/product/:product', (req, res, next) => {
    // set requestedProduct to equal the parameter request
    const requestedProductId = req.params.product;
    //NOTE: maybe add check to see if requestedProduct is a number(id)

    //Find and send the product with the id which matches the requestedProductId
    Product
        .find({_id : requestedProductId})
        .exec((err,product) => {
            if (err) throw err;
            res.send(product);
        })
})



module.exports = router
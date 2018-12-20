const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

router.get('/generate-fake-data', (req,res,next) => {
   for (let i = 0; i < 90 ; i++) {
      let product = new Product()
      let randomNumberOfReviews = Math.floor(Math.random() * 3);

      product.id = (i+1);
      product.reviews = [];
      product.category = faker.commerce.department();
      product.name = faker.commerce.productName();
      product.price = faker.commerce.price();
      product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png';

      for (let j = 0; j < randomNumberOfReviews; j++){
         let review = new Review()

         review.userName = faker.name.firstName() + ' ' + faker.name.lastName();
         review.text = faker.lorem.sentence();
         review.product = product._id;

         review.save((err) => {
            if (err) throw err
         })
         product.reviews.push(review);
      }
      
      product.save((err) => {
         if (err) throw err
      })
   }
   res.end()
})

router.get('/products', (req,res,next) => {
   let page = parseInt(req.query.page) || 1;
   let limit = parseInt(req.query.limit) || 10;
   let itemsToSkip = (page - 1) * limit;

   Product
      .find()
      .skip(itemsToSkip)
      .limit(limit)
      .populate('reviews')
      .exec((err, products) => {
         Product.count().exec((err, count) => {
            if (err) return next(err)
            res.send(products)
         })
      })
})

module.exports = router
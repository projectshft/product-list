const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')
const querystring = require('querystring');
const url = require('url');
const checkPageNumber = require('../utils');


router.get('/reviews', (req,res) => {
  //design decision - reviews returned at a time
  const reviewLimitPerPage = 40;
  Review.find({}, (err, reviews) => {
    if (err) throw err;
    const totalReviews = reviews.length;
    //util function which returns 0 if there was an error, 1 if no page was specified, and the correct number if a valid page was specified
    const page = checkPageNumber(req, totalReviews, reviewLimitPerPage);
    if (page === 0 ) {
      res.status(404);
      res.send('Page not found');
    } else {
    //use mongoose's paginate package to return the requested page with a limit of 40 reviews
      Review.paginate({}, { page: page, limit: reviewLimitPerPage }, (err, reviews) => {
        res.send(reviews);
      })
    }
  })
});

//route for initially generating data - development only
router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = faker.image.image()

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

//route for initially generating data - development only
router.get('/generate-fake-reviews', async (req, res, next) => {
  let products = await Product.find({});
  await products.forEach(product => {
    let review = new Review();
    review.text = faker.lorem.paragraph();
    review.userName = faker.internet.userName();
    let review2 = new Review();
    review2.text = faker.lorem.paragraph();
    review2.userName = faker.internet.userName();
    review.save();
    review2.save();
    product.reviews.push(review);
    product.reviews.push(review2);
    product.save();

  })
   await res.end()
 })


module.exports = router
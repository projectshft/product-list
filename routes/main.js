const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product');
const Review = require('../models/review');

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    // Create a new product instace
    let product = new Product()
    // set data
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
  const perPage = 9;
  // return the first page by default
  const page = req.query.page || 1;

  Product
    .find({})
    // skip documents based on the page number,
    // only skips by 9
    .skip((perPage * page) - perPage)
    .limit(perPage) // limit number of documents
    .exec((err, products) => {
      res.status(200).send(products)
      // Note that we're not sending `count` back at the moment, 
      // but in the future we might want to know how many are coming back
      // Product.countDocuments().exec((err, count) => {
      //   if (err) return next(err)
      //   res.send(products)
      // })
    })
});

// Return a specific product by ID
router.get('/products/:productId', (req, res, next) => {
  const productId = req.params.productId
  Product.findById(productId).exec((err, product) => {
    res.send(product);
  })
});

// Return all reviews, but limited to 40 at a time. Pass in an options page query 
// to paginate 
router.get('/reviews', (req, res, next) => {

});

// Create a new product in the database
router.post('/products', (req, res, next) => {

});

// Create a new review in the database by adding it the correct product's reviews array
router.post('/:productId/reviews', (req, res, next) => {
  const reviewToAdd = req.body;
  const productId = req.params.productId;

  Product.findById(productId).exec((err, product) => {
    let review = new Review(reviewToAdd);
    review.save();
    product.reviews.push(review);
    product.save();
    console.log('pros is ', product)
    res.status(200).send('successfully added review');
  });
});

// Delete a product by Id
router.delete('/products/:productId', (req, res, next) => {

});

// Delete review by Id
router.delete('/reviews/:reviewId', (req, res, next) => {

});

module.exports = router
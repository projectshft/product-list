const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

//Generate random products, with random reviews (between 1-3) on each product
router.get('/generate-fake-data', (req,res,next) => {

   for (let i = 0; i < 90 ; i++) {
      let product = new Product()
      let randomNumberOfReviews = Math.floor(Math.random() * 3);

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

// GET /products Returns products based on page and limit query parameters.
router.get('/products', (req,res,next) => {
   let page = parseInt(req.query.page) || 1;
   let limit = parseInt(req.query.limit) || 9;
   let itemsToSkip = (page - 1) * limit;

   Product
      .find()
      .skip(itemsToSkip)
      .limit(limit)
      .populate('reviews')
      .exec((err, products) => {
         Product.count().exec((err, count) => {
            if (err) throw err
            res.send({number_items: count, number_pages: Math.ceil(count/limit), current_page: page, products})
            res.end()
         })
      })
})

// GET /products/:productId Returns a specific product by it's id
router.get('/products/:productId', (req,res,next) => {

   Product
      .find({_id: req.params.productId })
      .populate('reviews')
      .exec((err, products) => {
         if (err) throw err
         res.send(products[0])
         res.end()
      })
})

// GET /reviews Returns ALL the reviews, but limited to 40 at a time.
router.get('/reviews', (req,res,next) => {
   let page = parseInt(req.query.page) || 1;
   let limit = parseInt(req.query.limit) || 40;
   let itemsToSkip = (page - 1) * limit;

   Review
      .find()
      .skip(itemsToSkip)
      .limit(limit)
      .populate('product')
      .exec((err, reviews) => {
         Review.count().exec((err, count) => {
            if (err) throw err

            res.send({number_items: count, number_pages: Math.ceil(count/limit), current_page: page, reviews})
            res.end()
         })
      })
})

// POST /products Creates a new product in the database
router.post('/products', (req, res, next) => {
   let productToAdd = new Product ();

   productToAdd.reviews = [];
   productToAdd.category = req.body.category;
   productToAdd.name = req.body.name;
   productToAdd.price = req.body.price;
   productToAdd.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png';

   productToAdd.save((err, product) => {
      if (err) throw err
      res.send(product)
      res.end()
   })
})

// POST /:productId/reviews Creates a new review in the database by adding it to the correct product's reviews array.
// router.post('/:productId/reviews', (req, res, next) => {
//    let reviewToAdd = new Review ();


//    reviewToAdd.save((err, review) => {
//       if (err) throw err
//       res.send(review)
//       res.end()
//    })
// })

// DELETE /products/:product Deletes a product by id
// DELETE /reviews/:review Deletes a review by id

module.exports = router
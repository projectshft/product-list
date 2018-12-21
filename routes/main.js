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

// GET /products Returns products based on page, limit, and category query parameters.
router.get('/products', (req,res,next) => {
   let page = parseInt(req.query.page) || 1;
   let limit = parseInt(req.query.limit) || 9;
   let itemsToSkip = (page - 1) * limit;
   let category = req.query.category;
   let categoryRegEx = new RegExp(category, "i");
   let categorySelector = category ? {category: categoryRegEx} : {};

   Product
      .find(categorySelector, {__v: 0})
      .skip(itemsToSkip)
      .limit(limit)
      .populate('reviews', {__v: 0})
      .exec((err, products) => {
         Product.count( categorySelector, (err, count) => {
            if (err) throw err

            res.send({number_items: count, number_pages: Math.ceil(count/limit), current_page: page, products})
            res.end()
         })
      })
})

// GET /products/:productId Returns a specific product by it's id
router.get('/products/:productId', (req,res,next) => {

   Product
      .find({_id: req.params.productId }, {__v: 0})
      .populate('reviews', {__v: 0})
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
      .find({}, {__v: 0})
      .skip(itemsToSkip)
      .limit(limit)
      .populate('product', {__v: 0})
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
router.post('/:productId/reviews', (req, res, next) => {
   let productId = req.params.productId;
   Product
      .findById(productId)
      .populate('reviews')
      .exec((err, product) => {
         if(err) throw err

         let reviewToAdd = new Review ();

         reviewToAdd.userName = req.body.userName;
         reviewToAdd.text = req.body.text;
         reviewToAdd.product = product._id;

         reviewToAdd
            .save((err, review) => {
               if (err) throw err

               res.send(review)
               product.reviews.push(reviewToAdd);
               Product
                  .findByIdAndUpdate(productId, {reviews: product.reviews})
                  .exec((err, product) => {
                     if (err) throw err

                     res.end()
                  });
            });

      });
})

// DELETE /products/:product Deletes a product by id
router.delete('/products/:productId', (req, res, next) => {
   let productId = req.params.productId;
   Product
      .findByIdAndRemove(productId)
      .populate('reviews')
      .exec((err,product) => {
         if (err) throw err

         product.reviews.forEach(review => {
            Review
               .findByIdAndRemove(review._id)
               .exec(err => {
                  if (err) throw err
               })
         });
         res.send(product)
         res.end()
      })
});

// DELETE /reviews/:reviewId Deletes a review by id
router.delete('/reviews/:reviewId', (req, res, next) => {
   let reviewId = req.params.reviewId;
   Review
      .findByIdAndRemove(reviewId)
      .exec((err,review) => {
         if (err) throw err
            res.send(review)
            res.end()
      });
});

module.exports = router
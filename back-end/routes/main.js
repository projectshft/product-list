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
      product.image = faker.image.imageUrl();


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

/*
GET /products Returns products based on the page, limit, search, and category query parameters. 
   Metadata of the returned object includes:
      "number_items": <The total number of items from the query>,
      "number_pages": <The total number of pages from the query>,
      "current_page": <The current page of the returned values in the response>,
      "categories": <An array of all unique categories from the Products collection, case insensitive>
*/
router.get('/products', (req,res,next) => {
   let page = parseInt(req.query.page) || 1;
   let limit = parseInt(req.query.limit) || 9;
   let itemsToSkip = (page - 1) * limit;

   //builds the category selector
   let category = req.query.category;
   let categoryRegEx = new RegExp(category, "i");
   let categorySelector = category ? {category: categoryRegEx} : {};

   //builds the price sorter
   let sortByPrice = {};
   if ( req.query.price && req.query.price.match(/lowest/i) ) {
      sortByPrice = { price: 'asc' };
   } else if ( req.query.price && req.query.price.match(/highest/i) ) {
      sortByPrice = { price: 'desc' };
   }

   //builds the search selector. The user should be able to search multiple keywords, and find case-insensitive matches where ALL keywords are found in the name of the product.
   let searchSelector = {};
   if (req.query.search) {
      let searchTermsArray = req.query.search.split(' ');
      let searchTermsArrayRegEx = searchTermsArray.map(term => new RegExp(term, "ig"));
      searchSelector = { name: {$all: searchTermsArrayRegEx}};
   }

   //combine selectors for category and search
   let combinedSelector = {...categorySelector, ...searchSelector};

   //Builds an array of categories from the database.
   let categories = [];
   let uniqueCategories = [];
   Product
      .find({}, 'category', (err, databaseCategories) => {
         if (err) throw err

         databaseCategories.forEach(element => {
            categories.push(element.category.toLowerCase())
         });

         //only include unique categories from the database, case insensitive
         uniqueCategories = [...new Set(categories)];         
      });

   Product
      .find(combinedSelector, {__v: 0})
      .sort(sortByPrice)
      .skip(itemsToSkip)
      .limit(limit)
      .populate('reviews', {__v: 0})
      .exec((err, products) => {
         if (err) throw err
         
         Product
            .count(combinedSelector, (err, count) => {
            if (err) throw err

            res.send({
               number_items: count, 
               number_pages: Math.ceil(count/limit), 
               current_page: page,
               categories: uniqueCategories, 
               products
            })

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
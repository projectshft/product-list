const router = require('express').Router();
const faker = require('faker'); // For populating database with fake data
const Product = require('../models/product'); // Import product model
const Review = require('../models/review'); // Import review model

/*****************************************************
  GET /products  <>  Return all products, pagenated 
******************************************************/
router.get('/products', (request, response, next) => {
  const perPage = 9; // Set per-page limit to 9, per assignment

  // Return the first page by default
  const page = request.query.page || 1;

  /****************************************************************************
    Optional queries  <>  Filter by category and/or sort by price
  _____________________________________________________________________________
    Set to {} initially, so absent queries don't affect request 
  ******************************************************************************/
  // Filter by category  <>
  // Example: localhost:8000/products?page=1&category=tools
  /*========================================================*/
  let categoryFilter = {};
  if (request.query.category) {
    categoryFilter = { ...categoryFilter, category: request.query.category };
  }

  /*========================================
  // Sort by ascending or descending price
  =========================================
  Example:
    localhost:8000/products?page=1&category=tools&price=highest
     or
    localhost:8000/products?page=1&category=tools&price=lowest
  _________________________________________________________________________
  It may exclude category or any other query; 
  all queries of products are optional
  Examples:
    localhost:8000/products?page=1&price=lowest
    localhost:8000/products?price=lowest
  *************************************************************************/
  const priceSort = {};
  if (request.query.price === 'highest') {
    priceSort.price = 'descending';
  } else if (request.query.price === 'lowest') {
    priceSort.price = 'ascending';
  }

  Product.find(categoryFilter) // Pass categoryFilter, which will be empty if not part of query (optional)
    .sort(priceSort)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((error, products) => {
      Product.estimatedDocumentCount(categoryFilter, (error, count) => {
        // NOTE: "count()" is deprecated, use "countDocuments()" or "estimatedDocumentCount()" (The latter is purportedly faster?)
        if (error) throw error;
        // Calculate total number of pages
        let pages = Math.ceil(count / perPage);
        response.send({ pages, products });
      });
    });
});

/**************************************************************
  GET /products/categories  <>  Return categories
***************************************************************/
router.get('/products/categories', (request, response) => {
  Product.distinct('category', (error, categories) => {
    if (error) throw error;
    else response.send(categories);
  });
});

/**************************************************************
  GET /products/:product  <>  Return a specific product by id
***************************************************************/
router.get('/products/:product', (request, response, next) => {
  Product.findById(request.params.product)
    .populate('reviews')
    .exec((error, product) => {
      if (!product) {
        response
          .status(404)
          .send(
            'Product not found. Make sure format is correct and product id is valid.'
          );
      } else if (error) throw error;
      else response.send(product);
    });
});

/*************************************************************************************************************
  GET /reviews  <>  Returns ALL reviews, limited to 40 at a time. 
  Retrieve them from products. Pass in an options page query to paginate.
**************************************************************************************************************/
router.get('/reviews', (request, response) => {
  const perPage = 40;
  // Return the first page by default (mimics GET /products)
  let page = request.query.page || 1;
  Review.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((error, reviews) => {
      Product.countDocuments().exec((error, count) => {
        if (error) throw error;
        response.send(reviews);
      });
    });
});

/**************************************************************
  DELETE /products/:product  <>  Delete a product by id
***************************************************************/
router.delete('/products/:product', (request, response) => {
  Product.findByIdAndDelete(request.params.product, error => {
    if (error) throw error;
    response.status(200).send('Product deleted');
  });
});

/**************************************************************
  DELETE /reviews/:review  <>  Delete a review by id
***************************************************************/
router.delete('/reviews/:review', (request, response) => {
  // Find and delete the specified review object
  Review.findOneAndDelete({ _id: request.params.review }, (error, review) => {
    if (error) throw error;

    // Find the related product and remove [ref to] the review from the product's reviews array
    Product.findOne({ _id: review.product._id }, (error, product) => {
      if (error) throw error;
      product.reviews.splice(product.reviews.indexOf(review._id), 1);
      // Save the product with updated array
      product.save(() => {
        response.status(200).send('Review deleted');
      });
    });
  });
});

/**************************************************************
POST /products  <>  Add a new product to the database
***************************************************************/
router.post('/products', (request, response) => {
  const newProduct = new Product({
    category: request.body.category,
    name: request.body.name,
    price: request.body.price,
    image: request.body.image,
    reviews: []
  });
  newProduct.save(error => {
    if (error) throw error;
    response.send(newProduct);
  });
});

/************************************************************************************************************
  POST /:product/reviews  <>  Add a new review to the designated product's reviews array
*************************************************************************************************************/
// router.post('/:product/reviews', (request, response) => {
router.post('products/:product/reviews', (request, response) => {
  let productId = request.params.product;
  Product.findById(productId)
    // .populate('reviews')
    .exec((error, product) => {
      if (error) throw error;
      let newReview = new Review();
      newReview.userName = request.body.userName;
      newReview.text = request.body.text;
      newReview.product = product._id;
      newReview.save((error, review) => {
        if (error) throw error;
        product.reviews.push(review);
        product.save();
      });
    });
});

/*************************************************** 
  Populate the database with faker product data
****************************************************/
router.get('/generate-fake-data', (request, response) => {
  for (let i = 1; i < 121; i++) {
    //Hard-coded to limit the number of fake products created to 120 per call to /generate-fake-data

    // Alternate between different urls for image placeholders, to spice up the mock
    let productImageUrl;
    if (i % 10 === 0) {
      productImageUrl = 'https://loremflickr.com/g/180/180/goat';
    } else if (i % 9 === 0) {
      productImageUrl = 'https://loremflickr.com/g/180/180/bicycle';
    } else if (i % 7 === 0) {
      productImageUrl = 'https://loremflickr.com/g/180/180/beer';
    } else if (i % 5 === 0) {
      productImageUrl = 'https://loremflickr.com/g/180/180/barn';
    } else if (i % 3 === 0) {
      productImageUrl = 'https://loremflickr.com/g/180/180/ape';
    } else if (i % 2 === 0) {
      productImageUrl = 'http://placebeard.it/g/180';
    } else productImageUrl = 'https://loremflickr.com/g/180/180/bear';

    let product = new Product();
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = productImageUrl;
    product.reviews = [];

    // A function to generate a random number for the quantity of reviews
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    // Hard-coded to provide a *maximum* of 24 reviews per product
    let quantityOfReviews = getRandomInt(24); // Hard-coded to provide a *maximum* of 12 reviews per product, per call to /generate-fake-data
    for (let j = 0; j < quantityOfReviews; j++) {
      let review = new Review();
      review.userName = faker.name.firstName();
      review.text = faker.lorem.paragraph();
      review.product = product._id;
      // Upon creation, a unique id will still be assigned to the new review
      review.save(error => {
        if (error) throw error;
      });
      // As the loop iterates, add the new review to the product's array of reviews
      product.reviews.push(review);
    }
    product.save(error => {
      if (error) throw error;
    });
  }
  response.end();
});

module.exports = router;

/***********************
  Project Details 
************************
========================
PART 1: Initial routes
========================
GET /products/product  <>  Returns a specific product by its id
GET /reviews  <>  Returns ALL the reviews, but limited to 40 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an options page query to paginate.
POST /products  <>  Creates a new product in the database
POST /:product/reviews  <>  Creates a new review in the database by adding it to the correct product's reviews array.
DELETE /products/:product  <>  Deletes a product by id (homgenize success/failure messages)
DELETE /reviews/:review  <>  Deletes a review by id (homgenize success/failure messages) */

// ==============================
// PART 2: Filter by category
// ==============================
// GET /products
// We'll want to be able to pass in an optional query to return only the products of the passed-in category. The url will look like this:
// localhost:8000/products?page=1&category=tools

// ========================
// PART 3: Sorting
// ========================
// GET /products
// We'll want to be able to pass in another optional query to return the products, but sorted by price - either from highest to lowest, or vice versa.
// The url will look like this:localhost:8000/products?page=1&category=tools&price=highest
// or
// localhost:8000/products?page=1&category=tools&price=lowest
// Also, it may exclude category or any other query, since they're all optional:
// localhost:8000/products?page=1&price=lowest
// This is another example.
// localhost:8000/products?price=lowest

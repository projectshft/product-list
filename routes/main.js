const router = require('express').Router();
const faker = require('faker'); // For populating database with fake data
const Product = require('../models/product'); // Import product model
const Review = require('../models/review'); // Import review model

/****************************
  Pagination (for products)
*****************************/
router.get('/products', (request, response, next) => {
  const perPage = 9;

  // Return the first page by default
  const page = request.query.page || 1;

  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((error, products) => {
      // NOTE: not sending `count` back at the moment, but in the future we might want to know how many are coming back
      // NOTE: "count()" is deprecated, use "countDocuments()" or "estimatedDocumentCount()" (the latter is purportedly faster?)
      Product.countDocuments().exec((error, count) => {
        if (error) return next(error);
        response.send(products);
      });
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
            'Product not found. Please make sure the formatting is correct and the product id is valid.'
          );
      } else response.send(product);
    });
});

/*************************************************************************************************************
  GET /reviews  <>  Returns ALL reviews, limited to 40 at a time. Retrieve them from products. Pass in an options page query to paginate.
**************************************************************************************************************/
router.get('/reviews', (request, response, next) => {
  const perPage = 40;
  // Return the first page by default (mimics GET /products)
  const page = request.query.page || 1;
  Review.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((error, reviews) => {
      Product.countDocuments().exec((error, count) => {
        if (error) throw error;
        // console.log('The number of returned reviews is: ', reviews.length);
        response.send(reviews);
      });
    });
});

/**********************************
*  Filter by category  
 ==================================
  GET /products  <>  optional query
    to return only the products of the passed-in category
___________________________________
  Example:
    localhost:8000/products?page=1&category=tools
***********************************/
router.get('/categories', (request, response) => {
  const query = Product.find({}).select('category -_id');
  query.exec((error, categories) => {
    if (error) throw error;
    response.send(categories);
  });
});

/**************************************
 *  Sorting
=======================================
  GET /products  <> optional query
    to return the products sorted by ascending or descending price.
=====================================================================
  Example:
    localhost:8000/products?page=1&category=tools&price=highest
     or
    localhost:8000/products?page=1&category=tools&price=lowest
_________________________________________________________________________________
  It may exclude category or any other query; all queries here are optional
  Examples:
    localhost:8000/products?page=1&price=lowest
    localhost:8000/products?price=lowest
*********************************************************************************/
router.get('/products?:category?:price', (request, response, next) => {
  const perPage = 9;
  const page = request.query.page || 1;
  let category = {};
  let price = {};

  if (request.query.category) {
    category = { category: request.query.category };
  } else {
    options = null;
  }

  if (request.query.price) {
    if (request.query.price === 'highest') {
      price = { price: -1 };
    } else if (request.query.price === 'lowest') {
      price = { price: 1 };
    } else {
      options = null;
    }
  }

  Product.find(category)
    .sort(price)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((error, products) => {
      Product.countDocuments().exec((error, count) => {
        if (error) return next(error);
        response.send(products);
      });
    });
});

/**************************************************************
  DELETE /products/:product  <>  Delete a product by id
***************************************************************/
//Deletes a product by id
router.delete('/products/:product', (request, response, next) => {
  Product.findByIdAndDelete(request.params.product, error => {
    if (error) throw error;
    response.status(200).send('Product has been deleted');
  });
});

/**************************************************************
  DELETE /reviews/:review  <>  Delete a review by id
***************************************************************/
router.delete('/reviews/:review', (request, response, next) => {
  // Find and delete the specified review object
  Review.findOneAndDelete({ _id: request.params.review }, (error, review) => {
    if (error) throw error;

    // Find the related product and emove [ref to] the review from the product's reviews array
    Product.findOne({ _id: review.product._id }, (error, product) => {
      if (error) throw error;
      product.reviews.splice(product.reviews.indexOf(review._id), 1);
      // Save the product with updated array
      product.save(() => {
        response.send({ success: true });
      });
    });
  });
});

/**************************************************************
POST /products  <>  Add a new product to the database
***************************************************************/
router.post('/products', (request, response, next) => {
  const newProduct = new Product({
    category: request.body.category,
    name: request.body.name,
    price: request.body.price,
    image: request.body.image,
    reviews: []
  });
  newProduct.save(error => {
    if (error) return error;
    // response.send(`${newProduct.name} has been added to the database`);
    response.send(newProduct);
  });
});

/************************************************************************************************************
  POST /:product/reviews  <>  Add a new review to the designated product's reviews array
*************************************************************************************************************/
// TODO: New review posts are making it into the reviews collection and being assinged an id, with product id association too, but the userName and text aren't making it in, and they're not making it into the product's reviews array. Also needs error handling.
// ==========================================================================================================
router.post('/:product/reviews', (request, response, next) => {
  let product = request.params.product;
  Product.findById(product)
    .populate('reviews')
    .exec((error, product) => {
      if (error) throw error;
      let newReview = new Review();
      newReview.userName = request.body.userName;
      newReview.text = request.body.text;
      newReview.product = product._id;
      newReview.save((error, review) => {
        if (error) throw error;
        product.reviews.push(newReview);
        Product.findByIdAndUpdate(product, { reviews: product.reviews }).exec(
          (error, product) => {
            if (error) return error;
            // response.end();
            response.send(review);
          }
        );
      });
    });
});

/*************************************************** 
  Populate the database with faker product data
****************************************************/
router.get('/generate-fake-data', (request, response, next) => {
  for (let i = 0; i < 12; i++) {
    // Alternate between two urls for image placeholders, just to spice up the mock
    let productImageUrl =
      i % 2 === 0
        ? 'http://placebeard.it/g/180'
        : 'https://loremflickr.com/g/180/180/bear';
    let product = new Product();
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = productImageUrl;
    product.reviews = [];

    // Generate a random number for the quantity of reviews
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    let quantityOfReviews = getRandomInt(24); // Hard-coded to provide a *maximum* of 24 reviews per product
    for (let j = 0; j < quantityOfReviews; j++) {
      let review = new Review();
      review.userName = faker.name.firstName();
      review.text = faker.lorem.paragraph();
      review.product = product._id;
      // Upon creation, a unique id will still be assigned to new review as its first property
      review.save(error => {
        if (error) throw error;
      });
      // Add the new review to the product's array of reviews
      product.reviews.push(review);
    }
    product.save(error => {
      if (error) throw error;
    });
  }
  response.end();
});

module.exports = router;

/***********************************************************************************************
  Project Details 
************************************************************************************************
========================
PART 1: Initial routes
========================
GET /products/product  <>  Returns a specific product by its id
GET /reviews  <>  Returns ALL the reviews, but limited to 40 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an options page query to paginate.
POST /products  <>  Creates a new product in the database
FIXME: POST /:product/reviews  <>  Creates a new review in the database by adding it to the correct product's reviews array.
FIXME: DELETE /products/:product  <>  Deletes a product by id (homgenize success/failure messages)
FIXME:DELETE /reviews/:review  <>  Deletes a review by id (homgenize success/failure messages) */

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

/**********************
  TODO: 
**********************/
// Add/improve error handling
// Homogenize success/error messages
// next!!!

/**********************
  To Review
**********************/
// React Form w/ drop-down menus/toggles/radio buttons & search-bar functionality
// React Router

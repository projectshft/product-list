const router = require('express').Router();
const { request, response } = require('express');
const faker = require('faker');
const mongoose = require('mongoose');

const Product = require('../models/product');
const Review = require('../models/review');

router.get('/generate-fake-products', (request, response, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = 'https://via.placeholder.com/250?text=Product+Image';

    product.save((err) => {
      if (err) throw err;
    });
  }
  response.end();
});

router.get('/generate-fake-reviews', (request, response, next) => {
  let review = new Review();

  review.userName = 'James Joyce';
  review.text = 'A terrible burger';
  review.productId = '5f77b2f3863dc51630ad4858';

  review.save((err) => {
    if (err) throw next(err);
  });

  Product.findById('5f77b2f3863dc51630ad4858')
    .populate('reviews')
    .exec((error, product) => {
      if (error) return next(error);
      product.reviews.push(review);
      product.save((error) => {
        if (error) return next(error);
        response.end();
      });
    });
});

//GET Products and Products Count for page in query string, return 9 per page
router.get('/products', (request, response, next) => {
  const perPage = 9;
  const page = request.query.page || 1; //req.query.page is optional. will default to 1 if not sent
  Product.find({}) //no filter set with {}; not {name: sponge}, eg
    .skip(perPage * page - perPage) //9*1=9-9=0: skip nothing for page 1
    .limit(perPage) //limit to 9 per page
    .exec((error, products) => {
      //products is our 9 results for page 1
      Product.count() //count all products in entire Products collection
        .exec((err, productCount) => {
          if (err) return next(err);
          const results = {
            listOfProducts: products,
            countOfAllProducts: productCount,
          };
          response.send(results); //
        });
    });
});

//GET Product by productId: successful
router.get('/products/:productId', (request, response, next) => {
  //if the productId is invalid, deliver a Bad Request error
  if (!mongoose.isValidObjectId(request.params.productId)) {
    response.sendStatus(400);
    response.end();
  }
  Product.findById(request.params.productId, (error, product) => {
    //if no product found by productId, return a Not Found error
    if (error || !product) {
      response.sendStatus(404);
    }
    //else return product
    response.send(product);
  });
});

//TODO: limit review results to 4 & implement optional pagination
//GET full-text reviews by productId: successful.
router.get('/products/:productId/reviews', (request, response, next) => {
  //if the productId is invalid, deliver a Bad Request error
  if (!mongoose.isValidObjectId(request.params.productId)) {
    response.sendStatus(400);
    response.end();
  }
  const returnLimit = 4;
  const page = request.query.page || 1;

  Product.findById(request.params.productId)
    .populate('reviews')
    .exec((error, product) => {
      if (error || !product) {
        response.sendStatus(404);
      }
      response.return(product.reviews);

      // .limit(returnLimit)
      // .skip(returnLimit * page - returnLimit)
      // .exec((error, reviews) => {
      //   if (error || !product.reviews) {
      //     response.sendStatus(404);
      //   }
      //   response.end();
    });
  
});

//COULD DO: Handle edge cases and errors
//POST a new product to the collection: successful
router.post('/products', (request, response, next) => {
  let product = new Product();

  product.category = request.body[0].category;
  product.name = request.body[0].name;
  product.price = request.body[0].price;
  product.image = request.body[0].image;

  product.save((error) => {
    if (error) return next(error);
    response.end();
  });
});

//POST a review's ObjectId to a product's review array: successful
router.post('/products/:productId/reviews', (request, response, next) => {
  //if the productId is invalid, deliver a Bad Request error
  if (!mongoose.isValidObjectId(request.params.productId)) {
    response.sendStatus(400);
    response.end();
  }
  //use findById to locate the ObjectId match to params.productId
  Product.findById(request.params.productId)
    //the plan is to populate the product's 'reviews' array
    .populate('reviews')
    .exec((error, product) => {
      if (error) return next(error);
      //build the review using the request body parameters; save it
      let review = new Review();
      review.userName = request.body.userName;
      review.text = request.body.text;
      review.save((error) => {
        if (error) return next(error);
        //push the review into the product's reviews array and save the product
        product.reviews.push(review);
        product.save((error) => {
          if (error) return next(error);
          response.end();
        });
      });
    });
});

//DELETE product by productId: successful
router.delete('/products/:productId', (request, response, next) => {
  //if the productId is invalid, deliver a Bad Request error
  if (!mongoose.isValidObjectId(request.params.productId)) {
    response.sendStatus(400);
    response.end();
  }
  Product.deleteOne({ _id: request.params.productId }, (error, product) => {
    if (error) {
      response.sendStatus(404);
    } else {
      response.end();
    }
  });
});


//TODO!
//DELETE review by reviewID
router.get('/reviews/:reviewId', (request, response, next) => {
  //if the reviewId is invalid, deliver a Bad Request error
  if (!mongoose.isValidObjectId(request.params.reviewId)) {
    response.sendStatus(400);
    response.end();
  }

  // Review.find({}, (error, reviews) => {
  //   if (error) {
  //     response.sendStatus(404);
  //   } else {
  //     response.send(reviews);
  //   }
  // });
});

module.exports = router;

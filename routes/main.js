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

//GET Products and Products Count for page in query string, return 9 per page: successful
//GET Products by category, 9 per page, count of items in category & total count: successful
//GET All Products sort by price low to high w/ counts: successful
//GET Products by category as above, sort by price low to high w/ all counts: successful
//GET Products by search term & sort: successful!
router.get('/products', (request, response, next) => {
  const perPage = 9;
  const page = request.query.page || 1; //req.query.page is optional. will default to 1 if not sent

  if (!request.query.category && !request.query.search) {
    Product.find({})
      .count()
      .exec((error, allProductsCount) => {
        if (error) return next(error);

        if (!request.query.sort) {
          Product.find({})
            .skip(perPage * page - perPage) //9*1=9-9=0: skip nothing for page 1
            .limit(perPage) //limit to 9 per page
            .exec((error, allProductsUnsorted) => {
              if (error) return next(error);
              const productsAll = {
                count: allProductsCount,
                list: allProductsUnsorted,
              };
              response.send({ products: productsAll });
            });
        } else if (request.query.sort === 'lowest') {
          Product.find({})
            .sort({ price: +1 })
            .skip(perPage * page - perPage) //9*1=9-9=0: skip nothing for page 1
            .limit(perPage) //limit to 9 per page
            .exec((error, allProductsLowToHigh) => {
              if (error) return next(error);
              const productsAllLowest = {
                count: allProductsCount,
                list: allProductsLowToHigh,
              };
              response.send({
                products: productsAllLowest,
              });
            });
        } else if (request.query.sort === 'highest') {
          Product.find({})
            .sort({ price: -1 })
            .skip(perPage * page - perPage) //9*1=9-9=0: skip nothing for page 1
            .limit(perPage) //limit to 9 per page
            .exec((error, allProductsHighToLow) => {
              if (error) return error;
              const productsAllHighest = {
                count: allProductsCount,
                list: allProductsHighToLow,
              };
              response.send({
                products: productsAllHighest,
              });
            });
        }
      });
  } else if (request.query.category) {
    Product.find({ category: request.query.category })
      .count()
      .exec((error, countOfProdInCategory) => {
        if (error) {
          return error;
        }
        const prodCatCount = countOfProdInCategory;

        if (!request.query.sort) {
          Product.find({ category: request.query.category })
            .skip(perPage * page - perPage) //9*1=9-9=0: skip nothing for page 1
            .limit(perPage) //limit to 9 per page
            .exec((error, listOfProdInCategoryUnsorted) => {
              if (error) return next(error);
              const productCatResultsUnsorted = {
                count: prodCatCount,
                list: listOfProdInCategoryUnsorted,
              };
              response.send({
                products: productCatResultsUnsorted,
              });
            });
        } else if (request.query.sort === 'lowest') {
          Product.find({ category: request.query.category })
            .sort({ price: +1 })
            .skip(perPage * page - perPage) //9*1=9-9=0: skip nothing for page 1
            .limit(perPage) //limit to 9 per page
            .exec((error, prodByCatLowToHigh) => {
              if (error) return next(error);
              const prodCatResultsLowToHigh = {
                count: countOfProdInCategory,
                list: prodByCatLowToHigh,
              };
              response.send({
                products: prodCatResultsLowToHigh,
              });
            });
        } else if (request.query.sort === 'highest') {
          Product.find({ category: request.query.category })
            .sort({ price: -1 })
            .skip(perPage * page - perPage) //9*1=9-9=0: skip nothing for page 1
            .limit(perPage) //limit to 9 per page
            .exec((error, prodByCatHighToLow) => {
              if (error) return next(error);
              const productCatResultsHighToLow = {
                count: countOfProdInCategory,
                list: prodByCatHighToLow,
              };
              response.send({
                products: productCatResultsHighToLow,
              });
              response.end();
            });
        }
      });
  } else if (request.query.search) {
    Product.find({ $text: { $search: request.query.search } })
      .count()
      .exec((error, countOfProdSearched) => {
        if (error) return next(error);

        if (!request.query.sort) {
          Product.find({ $text: { $search: request.query.search } })
            .skip(perPage * page - perPage) //9*1=9-9=0: skip nothing for page 1
            .limit(perPage) //limit to 9 per page
            .exec((error, listOfProdSearchedUnsorted) => {
              if (error) return next(error);
              const productSearchResultsUnsorted = {
                count: countOfProdSearched,
                list: listOfProdSearchedUnsorted,
              };
              response.send({
                products: productSearchResultsUnsorted,
              });
            });
        } else if (request.query.sort === 'lowest') {
          Product.find({ $text: { $search: request.query.search } })
            .sort({ price: +1 })
            .skip(perPage * page - perPage) //9*1=9-9=0: skip nothing for page 1
            .limit(perPage) //limit to 9 per page
            .exec((error, prodSearchedLowToHigh) => {
              if (error) return next(error);
              const prodSearchResultsLowToHigh = {
                count: countOfProdSearched,
                list: prodSearchedLowToHigh,
              };
              response.send({
                products: prodSearchResultsLowToHigh,
              });
            });
        } else if (request.query.sort === 'highest') {
          Product.find({ category: request.query.search })
            .sort({ price: -1 })
            .skip(perPage * page - perPage) //9*1=9-9=0: skip nothing for page 1
            .limit(perPage) //limit to 9 per page
            .exec((error, prodSearchedHighToLow) => {
              if (error) return next(error);
              const productSearchResultsHighToLow = {
                count: countOfProdSearched,
                list: prodSearchedHighToLow,
              };
              response.send({
                products: productSearchResultsHighToLow,
              });
              response.end();
            });
        }
      });
  }
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
//GET full-text reviews by productId: successful!
//FOR TESTING: localhost:8000/products/5f77b2f2863dc51630ad4857/reviews
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
    .exec((error, reviews) => {
      if (error || !reviews) {
        return next(error);
      }
      response.send(reviews);

      //PROBLEM: these methods do not work on variable 'reviews'
      //SOLUTION? Loop through review array?
      //Challenge for pagination.
      //   .skip(returnLimit * page - returnLimit)
      //   .limit(returnLimit)
      //   .exec((error, reviews) => {
      //     if (error) return next(error);
      //     response.send(reviews);
      //   });
    });
});

//COULD DO: Handle edge cases and errors (empty fields, non-number for price)
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
      review.productId = request.params.productId;
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

//TODO! remove reviewId from the product
//TODO? Switch away from population method
//DELETE review by reviewID: successful
router.delete('/reviews/:reviewId', (request, response, next) => {
  //if the reviewId is invalid, deliver a Bad Request error
  if (!mongoose.isValidObjectId(request.params.reviewId)) {
    response.sendStatus(400);
    response.end();
  }
  Review.deleteOne({ _id: request.params.reviewId }, (error, review) => {
    if (error) {
      response.sendStatus(404);
    } else {
      Product.find({ reviews: request.params.reviewId }, (error, product) => {
        if (error) return error;
      });
    }
    response.end();
  });
});

module.exports = router;

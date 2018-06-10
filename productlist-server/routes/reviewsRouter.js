const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const ReviewSchema = require('../models/review')
const Review = mongoose.model("Review", ReviewSchema);

//=======================================================//
// Middleware router.param used to validate reviewId & productId
//=======================================================//

// Middleware to verify param 'reviewId' is valid mongoose ObjectId Type.
// Without this, there will be cast type error when reviewID is invalid.
router.param('reviewId', function(request, response, next, reviewId) {
    if (mongoose.Types.ObjectId.isValid(reviewId)) {
        request.reviewId = reviewId;
        next();
    } else { // Else if not a valid mongoose ObjectId Type.
        return response.status(400).send("Not a valid mongoose ObjectId Type.")
    }
});

// Same middleware from productsRouter
// Really wanted to separate products and reviews, but because population is not being used, it's not possible.
// Question for future, Why does population slow performance??

// Middleware to verify param 'productId' is valid mongoose ObjectId Type.
// Without this, there will be cast type error when productID is invalid.
router.param('productId', function(request, response, next, productId) {
    if (mongoose.Types.ObjectId.isValid(productId)) {
      // assigning mongoose object query (product) to request.product.
      request.product = Product.findById(productId);
      next();
    } else { // Else if not a valid mongoose ObjectId Type.
      return response.status(400).send("Not a valid mongoose ObjectId Type.")
    }
  });
  
//====================== End of Middleware =====================//

//========================== Router handler for different API request method related to Reviews(s) ===============================//

// Product ID is verified in the router.param middleware at line 9 of this file.
// This route allow users to post reviews to the product.
router.post('/:productId/reviews', (request, response, next) => {
    request.product.exec((err, product) => {
      if (err) throw err;
      // If product == null, return 404.
      if(!product){
        return response.status(404).send("No product with that ID found.");
      } else { // else push new review to product and save to product.
        if(request.body.newReview){
          let newReview = new Review();
          
          // if username is blank, assign "Anonymous User"
          newReview.username = request.body.username || "Anonymous User";
          newReview.text = request.body.newReview;
          product.reviews.push(newReview);
          product.save();
          return response.status(200).send(product);
        } else {
          return response.status(400).send("To post review, please include newReview in the request body");
        }
      }
    })
  });

// This route returns all reviewed products' id and their reviews.
router.get('/reviews', (request, response, next) => {
    let allReviews = [];
    Product
        .find({reviews: {$not:{$size:0}} }) // reviews that are not size of 0.
        .exec((err, products) =>{
            if(err) throw err;

            // for each product that have reviews
            // push reviews into allReviews
            products.forEach((product) => {
                let reviewDetail = {}
                reviewDetail.productId = product.id;
                reviewDetail.reviews = product.reviews;

                allReviews.push(reviewDetail);
            });
            // if there are no reviews, return 404
            if(allReviews.length == 0){
                return response.status(404).send("No reviews found.");
            } else { // else return allReviews
                return response.status(200).send(allReviews);
            }
        })
});

// This route returns all reviewed products' id and their reviews.
router.get('/reviews', (request, response, next) => {
    let allReviews = [];
    Product
        .find({reviews: { $size: {$gt: 1}}}) //
        .exec((err, products) =>{
            if(err) throw err;
            // for each product with review, push product id and its reviews to allReviews array
            products.forEach((product) => {
                let reviewDetail = {}
                reviewDetail.productId = product.id;
                reviewDetail.reviews = product.reviews;

                allReviews.concat(reviewDetail);
            });
            if(allReviews.length == 0){
                return response.status(404).send("No reviews found.");
            }
            return response.status(200).send(allReviews);
        })
});

// This route returns all products with that reviewId (should only be one)
// used find, instead of findOne, so the router returns an array
router.delete('/reviews/:reviewId', (request, response, next) => {
    Product
        .find({ reviews: {$elemMatch:{ _id: request.reviewId}} })
        .exec((err, products) =>{
            if(err) throw err;
            products.forEach(product => {
                product.reviews.pull({_id:request.reviewId})
                product.save();
            })
            if(products.length == 0){
                return response.status(404).send("No review with that ID found");
            } else {
                response.send(products);
            }
        })
});

module.exports = router
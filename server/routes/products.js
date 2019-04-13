const router = require('express').Router();
const queryString = require('querystring');
const url = require('url');
const Product = require('../models/product');
const Review = require('../models/review');

// Gets the specific product for a supplied ID for any routes that take a specific product ID

router.param('product', (request, response, next, id) => {
  Product.find({ _id: id }, (error, product) => {
    if (error) {
      response.status(404).send('Product was not found');
    }
    request.product = product;
    next();
  });
});

// Returns all of the products at 9 per page

router.get('/products', (request, response, next) => {

  const perPage = 9;

  // return the first page by default
  const page = request.query.page || 1;

  Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((error, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Product.countDocuments().exec((error, count) => {
        if (error) return next(error)

        response.send(products)
      })
    })
})

// GET This endpoint returns a single product based on supplied ID

router.get('/products/:product', (request, response) => {
  response.send(request.product);
});

// POST This endpoint allows a user to add a new product to the database

router.post('/products', (request, response) => {
  const newProduct = new Product({
    category: request.body.category,
    name: request.body.name,
    price: request.body.price,
    image: request.body.image,
    reviews: []
  });
  newProduct.save();
  response.send(newProduct);
});

// POST This endpoint allows a user to add a new review to a product

router.post('/products/:product/reviews', (request, response) => {
  const newReview = new Review({
    userName: request.body.userName,
    text: request.body.text,
    product: request.product[0]
  });
  newReview.save();
  request.product[0].reviews.push(newReview);
  request.product[0].save();
  response.send(newReview);
});

// DELETE This endpoint removes a specific product based on supplied ID

router.delete('/products/:product', (request, response) => {
  Product.findOneAndDelete({ _id: request.product[0]._id }, (error, product) => {
    if (error) throw error;

    // Also deletes the reviews associated with the product from the review collection
    product.reviews.forEach(review => {
      Review.findOneAndDelete({ _id: review._id }, error => {
        if (error) throw error;
      });
    });

    response.send('Product successfully deleted');
  });
});

module.exports = router;
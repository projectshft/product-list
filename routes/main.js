const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/product');

router.get('/generate-fake-data', (request, response, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = 'https://via.placeholder.com/250?text=Product+Image';

    product.save((error) => {
      if (error) throw error;
    })
  }
  response.end();
})

router.get('/products', (request, response, next) => {
  //products to display on each page
  const perPage = 9;

  // return the first page by default
  const page = request.query.page || 1;

  //get category query 
  const searchCategory = request.query.category;

  //get search query
  const searchQuery = request.query.query;

  //
  // let sortBy = { price: request.query.price } || {}

  // if (sortBy.price === 'highest') {
  //   sortBy.price = 'desc'
  // } else if (sortBy.price === 'lowest') {
  //   sortBy.price = 'asc'
  // }

  Product
    .find(searchCategory ? { category: searchCategory } : {})
    .collation({ locale: 'en', strength: 2 })
    .where(searchQuery ? { name: { $regex: searchQuery, $options: 'i' } } : {})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((error, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Product.countDocuments().exec((error, count) => {
        //handle error
        if (error) return next(error);

        //send filtered/sorted products and count
        response.send({ count, products });
      });
    });
});

router.get('/products/:product', (request, response, next) => {
  //find product with product id
  Product
    .findOne({ _id: request.params.product })
    .exec((error, foundProduct) => {

      //send error if product not found
      if (error) return next(error);

      //send product if found
      response.send(foundProduct);
    });
});

router.get('/products/:product/reviews', (request, response, next) => {
  //find product with product id
  Product
    .findOne({ _id: request.params.product })
    .exec((error, foundProduct) => {
      //send error if product not found
      if (error) return next(error);

      //send product if found
      response.send(foundProduct.reviews);
    });
});

router.post('/products', (request, response, next) => {
  //get product info from request
  const productToAdd = request.body;

  //create a new product
  Product
    .create(productToAdd, (error, addedProduct) => {
      //send error if product not added
      if (error) return next(error);

      //send new product
      response.send(addedProduct);
    });
});

router.post('/products/:product/reviews', (request, response, next) => {

  //get review from request
  const reviewToAdd = request.body;


  Product  //find the product to review  && add review to product's reviews array
    .updateOne({ _id: request.params.product }, { $push: { reviews: reviewToAdd } }, (error) => {

      //send error if product not found/review not updated
      if (error) return next(error);

      //send confirmation
      response.send("Review added");
    });
});

router.delete('/products/:product', (request, response, next) => {
  Product
    .where({ _id: request.params.product })
    .findOneAndDelete((error, deletedProduct) => {
      //send error if product not found
      if (error) return next(error);

      //send confirmation
      response.send("Product has been removed");
    });
});

router.delete('/reviews/:review', (request, response, next) => {
  Product
    .updateOne({ reviews: { $elemMatch: { _id: request.params.review } } }, { $pull: { reviews: { _id: request.params.review } } }, (error) => {
      //send error if review not found/updated
      if (error) return next(error)

      //send confirmation
      response.send("Review has been removed");
    })
});



module.exports = router;
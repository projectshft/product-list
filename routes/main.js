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
});

router.get('/products', (request, response, next) => {
  //products to display on each page
  const perPage = 9;

  //get queries
  const page = request.query.page || 1; //return first page by default
  const searchCategory = request.query.category;
  const searchQuery = request.query.query;
  let sortBy = request.query.price;

  //translate sort query into mongo terminology
  if (sortBy === 'highest') {
    sortBy = 'desc';
  } else if (sortBy === 'lowest') {
    sortBy = 'asc';
  }

  //for total count of filtered product results
  let resultCount;

  //search to get filtered result count
  Product
    .find(searchCategory ? { category: searchCategory } : {}) //optionally filter by category
    .collation({ locale: 'en', strength: 2 }) //make search case insensitive
    .where(searchQuery ? { name: { $regex: searchQuery, $options: 'i' } } : {}) //optionally search by query (case insensitive)
    .countDocuments() //count how many filtered results were found
    .exec((error, count) => {
      //send error
      if (error) return next(error);

      //save count
      resultCount = count;
    });

  //search to get filtered result products
  Product
    .find(searchCategory ? { category: searchCategory } : {}) //optionally filter by category
    .collation({ locale: 'en', strength: 2 }) //make search case insensitive
    .where(searchQuery ? { name: { $regex: searchQuery, $options: 'i' } } : {}) //optionally search by query (case insensitive)
    .sort(sortBy ? { price: sortBy } : 0) //optionally sort by price
    .skip((perPage * page) - perPage) //skip results based on page number
    .limit(perPage) //limit results per page
    .exec((error, products) => {
      //send error
      if (error) return next(error);

      //send count of total filtered results and limited products
      response.send({ count: resultCount, productResults: products });
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
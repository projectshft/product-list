const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/product');
const Review = require('../models/review');
const Category = require('../models/category');

//batch of existing Product ids
const prodIds = [
  "5d3a08492a420740584cad50",
  "5d3a08492a420740584cad51",
  "5d3a08492a420740584cad52",
  "5d3a08492a420740584cad53",
  "5d3a08492a420740584cad54",
  "5d3a08492a420740584cad55",
  "5d3a08492a420740584cad56",
  "5d3a08492a420740584cad57",
  "5d3a08492a420740584cad58"
];

//Faker Product Data, attempt to override images
router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image= 'https://cdn.shopify.com/s/files/1/1430/0320/products/ridf-mrsau_1024x1024.png?v=1476045480';
    product.reviews = [];
    for (let i = 0; i < 3; i++) {
      const review = new Review();
      review.author = faker.name.firstName() + ' ' + faker.name.lastName();
      review.reviewText = faker.lorem.sentences();
      review.product = product;
      review.save()
      product.reviews.push(review);
    }

    product.save((err) => {
      if (err) throw err
    })
  }
  res.status(200).end()
});

//fake reviews
router.get('/generate-fake-reviews', (req, res, next) => {
  for (let i = 0; i < 5; i++) {
    let review = new Review();

    review.reviewText = faker.lorem.sentences();
    review.author = faker.name.firstName() + ' ' + faker.name.lastName();
    review.product = prodIds[Math.floor((Math.random() * prodIds.length))];

    review.save((err) => {
      if (err) throw err
    })
  }
  res.status(200).end()
});

//fake categories
router.get('/generate-fake-categories', (req, res, next) => {
  for (let i = 0; i < 5; i++) {
    let category = new Category();

    category.name = faker.lorem.word();

    category.save((err) => {
      if (err) throw err
    })
  }
  res.status(200).end()
});

module.exports = router;
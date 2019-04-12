const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/product');
const Review = require('../models/review');

/* This endpoint allows you to generate random products and reviews to populate the database
   for testing purposes */

router.get('/generate-fake-data', (request, response, next) => {
  
  // Create 80 random products 
  for (let i = 0; i < 80; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png';
    product.reviews = [];

  // Get random number of reviews for each product
  const randomReviewAmount = Math.floor(Math.random() * 5);

  // Create random number of reviews, save them, and push them into product reviews
  for (let j = 0; j < randomReviewAmount; j++) {
    let review = new Review ({
      userName: faker.internet.userName(),
      text: faker.lorem.sentences(2),
      product: product
    });

    review.save(error => {
      if (error) throw error;
    });
    
    product.reviews.push(review);
  }  

    product.save((error) => {
      if (error) throw error;
    })
  }
  response.end();
})

module.exports = router
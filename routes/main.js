const router = require('express').Router();
const { faker } = require('@faker-js/faker');
const { Product } = require('../models/product');
const mongoose = require('mongoose');

router.param('productId', (req, res, next, id) => {
  //Checks that productId is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID format.');
  }
  next();
});

router.get('/get-fake-data', async (req, res, next) => {
  
  for (let i = 0; i < 100; i++) {
    let product = new Product();
    const numReviews = Math.floor(Math.random() * 8);

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = 'https://via.placeholder.com/250?text=Product+Image';
    
    // Create fake reviews
    for (let j = 0; j < numReviews; j++) {
      const username = faker.internet.userName();
      const text = faker.lorem.sentence();
      
      product.reviews.push(
        {
          'username': username,
          'text': text,
        }
      );
    }

    await product.save()
      .catch(err => console.error(err));
  }
  res.status(200).send('Products saved');
});

router.get('/products', (req, res, next) => {
  // takes query for page number and defaults to 1 if no page included
  let reqPage = req.query.page || 1;

  // prevent invalid page numbers
  if (reqPage <= 0) {
    reqPage = 1;
  }

  // sets page size to 9
  const perPage = 9;
  
  Product.find()
    .skip((reqPage - 1) * perPage)
    .limit(perPage)
    .then((products) => {
      // const count = products.length;
      // console.log({count});
      res.send(products);
    })
    .catch(err => console.error(err));
});

// Returns a specific product by id
router.get('/products/:productId', (req, res) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then(product => {
      res.send(product);
    });

});

// Returns reviews for a specific product id
router.get('/products/:productId/reviews', (req, res) => {
  const { productId } = req.params;
  
  // takes query for page number
  const { page } = req.query;
  let start = 0;
  let stop = 4;
  const limit = 4; // limit the returned reviews to 4 per page

  // change skip value if included
  if (!!page) {
    start = (page - 1) * limit;
    stop = page * limit;
  }

  Product.findById(productId, 'reviews') // Only need reviews from the DB query
    .then(product => {
      // Map over the reviews to remove the _id field from each review
      const reviewsWithoutId = product.reviews.map(review => {
        const { _id, ...reviewWithoutId } = review.toObject();
        return reviewWithoutId;
      });

      // Slices the array to return only 4 reviews per page
      const reviewsSliced = reviewsWithoutId.slice(start, stop);

      res.send(reviewsSliced);
    });
});

// Adds a new product
router.post('/products', async (req, res) => {
  const { name, price, category, image, reviews } = req.body;
  let product = new Product();

  product.name = name;
  product.price = price;
  product.category = category;
  product.image = image;

  await product.save();

  res.status(200).send('New product added');
});

// Adds a new review to a product
router.post('/products/:productId/reviews', (req, res) => {
  const { productId } = req.params;
  const { username, text } = req.body;

  Product.findById(productId)
    .then(
      product => {
        product.reviews.push({username, text});
        product.save();
        res.status(200).send('New review added');
      }
    );
    
});

module.exports = router;
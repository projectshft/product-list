const { faker } = require('@faker-js/faker');
const { Product } = require('../models/product');

async function addFakeData (req, res, next) {
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
}

function getProducts(req, res, next) {
  const { page = 1, category } = req.query; // Defaults to page 1
  const limit = 9; // Limits the returned reviews to 4 per page
  const skip = page <= 0 ? undefined : (page - 1) * limit;
  const query = {};

  if (!!category) { query.category = category };
  
  Product.find(query)
    .skip(skip)
    .limit(limit)
    .then((products) => {
      res.send(products);
    })
    .catch(err => console.error(err));
}

// A callback function to find a specific product by ID
async function getProduct(req, res, next) {
  // Pulls productId from url parameter
  const { productId } = req.params;
  
  // Searches MongoDB for productId
  req.results = await Product.findById(productId);
  
  next();
}

function getReviews(productObj) {
  const reviewsCount = productObj.reviews.length;
  console.log({reviewsCount});
  
  return productObj.reviews;
}

// A function to remove the _id field from each review
function filterReviews(productObj) {
  
  const reviewsWithoutId = productObj.reviews.map(review => {
    const { _id, ...reviewWithoutId } = review.toObject();
    return reviewWithoutId;
  });

  return reviewsWithoutId;
}

async function paginateReviews (req, res, next) {
  const { page = 1 } = req.query; // Defaults to page 1
  const limit = 4; // Limits the returned reviews to 4 per page
  const start = (page - 1) * limit;
  const stop = page * limit;

  // const reviewsWithoutId = await filterReviews(req.results);

  // Slices the array to return only 4 reviews per page
  const reviewsLimited = req.results.reviews.slice(start, stop);

  const reviewCount = reviewsLimited.length;
  const pageCount = Math.ceil(reviewCount / limit);
  console.log({reviewCount, pageCount, page});

  // Sends results to client
  res.send(reviewsLimited);
}

async function addProduct(req, res) {
  const { name, price, category, image } = req.body;
  
  if (!name || !price || !category || !image) {
    return res.status(401).send('Please provide a name, price, category, and image.');
  }
  
  let product = new Product();

  product.name = name;
  product.price = price;
  product.category = category;
  product.image = image;

  await product.save();

  res.status(200).send('New product added');
}

function addReview(req, res) {
  const { productId } = req.params;
  const { username, text } = req.body;

  if (!username || !text) {
    return res.status(401).send('Missing required values: username, text');
  }

  Product.findById(productId)
    .then(
      product => {
        product.reviews.push({username, text});
        product.save();
        res.status(200).send('New review added');
      }
    );
}

async function deleteProduct(req, res) {
  // Pulls productId from url parameter
  const { productId } = req.params;

  await Product.findByIdAndDelete(productId);
  
  res.send('Product deleted');
}

async function deleteReview(req, res) {
  // Pulls reviewId from url parameter
  const { productId, reviewId } = req.params;

  const product = await Product.findById(productId);
  product.reviews.id(reviewId).deleteOne();
  
  await product.save();

  res.send('Review deleted');
}

module.exports = { 
  addFakeData, 
  getProducts, 
  getProduct, 
  addProduct, 
  paginateReviews, 
  addReview,
  deleteProduct,
  deleteReview
};
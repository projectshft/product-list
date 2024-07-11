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

async function getProducts(req, res, next) {
  let page = Number(req.query.page); 
  const { category, price, query } = req.query;
  
  // Check that the value of page is correct and default to 1 if not
  if (page <= 0 || isNaN(page)) { page = 1 }
  
  const limit = 9; // Limits the returned products to 9 per page
  const start = (page - 1) * limit;
  const stop = page * limit;
  const queryFilter = {};

  // If a category was included, add it to the query object.
  if (!!category) { queryFilter.category = { category } };

  // If a query parameter for 'query' was included, add it to the query object.
  if (!!query) { 
    queryFilter.$or = [
      { name: { $regex: query, $options: 'i' } }, 
      { category: { $regex: query, $options: 'i' } }
    ]; 
  }

  // Stores all results returned by MongoDB
  const results = await Product.find(queryFilter);
  const resultsCount = results.length;
  const totalPages = Math.ceil(resultsCount / limit);

  // Sort the results if the price query value is included
  if (price === 'lowest') {
    results.sort((a, b) => a.price - b.price);
  }

  if (price === 'highest') {
    results.sort((a, b) => b.price - a.price);
  }

  // Slices the array to return only 9 results per page
  const resultsLimited = results.slice(start, stop);

  // Sends the paginated results to the client
  res.send({ resultsCount, totalPages, page, resultsLimited });
}

// A callback function to find a specific product by ID
async function getProduct(req, res, next) {
  // Pulls productId from url parameter
  const { productId } = req.params;
  
  // Searches MongoDB for productId
  req.results = await Product.findById(productId);
  
  next();
}

// A function to pull the reviews array from a product document and log review count
function getReviews(productObj) {
  const reviews = productObj.reviews;
  console.log({reviews: reviews.length});
  
  return reviews;
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

  // Slices the array to return only 4 reviews per page
  const reviewsLimited = req.results.reviews.slice(start, stop);

  const reviewCount = reviewsLimited.length;
  const pageCount = Math.ceil(reviewCount / limit);

  // Sends results to client
  res.send({reviewCount, pageCount, page, reviewsLimited});
}

async function addProduct(req, res) {
  const { name, price, category, image } = req.body;
  
  if (!name || !price || !category || !image) {
    return res.status(401).send('Please provide a name, price, category, and image.');
  }
  
  let product = new Product({name, price, category, image});

  await product.save();

  res.status(201).send({product}); // New product added
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
        const review = product.reviews.slice(-1);
        product.save();
        res.status(201).send(review[0]); // New review added
      }
    );
}

async function deleteProduct(req, res) {
  // Pulls productId from url parameter
  const { productId } = req.params;

  await Product.findByIdAndDelete(productId);
  
  res.status(204).send('Successful operation');
}

async function deleteReview(req, res) {
  // Pulls reviewId from url parameter
  const { productId, reviewId } = req.params;

  const product = await Product.findById(productId);
  product.reviews.id(reviewId).deleteOne();
  
  await product.save();

  res.status(204).send('Successful operation');
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
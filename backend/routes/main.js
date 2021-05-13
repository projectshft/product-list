const router = require("express").Router();
//const faker = require("faker");
const { Product, Review } = require("../models/product");

// GET /products?page=# --- Returns: products w/ pagination
router.get('/products', (req, res) => {
  const page = req.query.page || 1
  const category = req.query.category || null;
  const sort = req.query.sort || null;
  const query = req.query.query || null;
  const perPage = 9
  const skipNum = ((page * perPage) - perPage);
  let filterObject = {};
  let sortObject = {};

  if (query) { 
    const regex = new RegExp(query, 'i') //case insensitive
    filterObject.name = {$regex: regex};
  }

  if (category) {
    const regex = new RegExp(category, 'i') //case insensitive
    filterObject.category = {$regex: regex};
  }

  if (sort === 'highest') sortObject.price = -1; //sort by price high
  if (sort === 'lowest') sortObject.price = 1; //sort by price low

  Product.find({}).select('category -_id').exec(function (err, categories) {
    if (err) return console.log(err);

    Product.find(filterObject).sort(sortObject).skip(skipNum).limit(perPage).exec(function (err, products) {
      if (err) return console.log(err);

      Product.find(filterObject).sort(sortObject).countDocuments().exec(function (err, count) {
        if (err) return console.log(err);

        res.send({
          products: products,
          count: count,
          categories: categories
        })
      })
    });
  })
});

// GET: /products/:product --- Returns a specific product by its id
// Test route: /products/609c0adf8ed5031bdbd78373
router.get('/products/:product', (req, res) => {
  const productId = req.params.product

  Product.findById(productId).exec(function (err, product) {
    if (err) return console.log(err);
    res.send(product);
  });
});

// GET /products/:product/reviews --- Returns reviews w/ pagination
// Test route: /products/609c0adf8ed5031bdbd78373/reviews/?page=2
router.get('/products/:product/reviews', (req, res) => {
  const productId = req.params.product
  const page = req.query.page || 1
  const perPage = 4
  const skipNum = ((page * perPage) - perPage);

  Review.find({ product: productId }).skip(skipNum).limit(perPage).exec(function (err, review) {
    if (err) return console.log(err);
    res.send(review)
  }); 
});


// POST /products --- Creates a new product in the db
router.post('/products/', (req, res) => {
  const { category, name, price, image } = req.body // Pull new product info from request

  const newProduct = new Product({  // Create new product with schema
    category: category || null,
    name: name || null,
    price: price || null,
    image: image || null,
  });

  newProduct.save() // Save new product to db
  .then(() => { // then verify and return to user
    Product.findById(newProduct._id).exec(function (err, product) {
      if (err) return console.log(err);
      res.send(product);
    });
  });
});

// POST /products/:product/reviews --- Creates new review in the db, adds to existing product
router.post('/products/:product/reviews', (req, res) => {
  const productId = req.params.product;
  const { userName, text } = req.body;

  Product.findById(productId).exec(function (err, product) {   //find the product
    if (err) return console.log(err);

    const newReview = new Review({ //create the new review
      userName: userName || null,
      text: text || null,
      product: product._id
    });

    newReview.save(); //save to db
    product.reviews.push(newReview) //add to found prodcut
    res.send(newReview); //return new review to user
  });
});

// DELETE /products/:product --- Deletes a product by id
router.delete('/products/:product', (req, res) => {
  const productId = req.params.product;
 
  Product.findById(productId).exec(function (err, product) {   //find the product
    if (err) return console.log(err);

    product.remove((err) => { //delete the product
      if (err) throw err;
      res.send('Success')
    });
  });
});

// DELETE /reviews/:review --- Deletes a review by id
router.delete('/reviews/:review', (req, res) => {
  const reviewId = req.params.review
  
  Review.findById(reviewId).exec(function (err, review) {
    if (err) return console.log(err);

    review.remove((err) => { //delete the review
      if (err) throw err;
      res.send('Success')
    });
  });  
});

module.exports = router;


/*****************************Testing*****************************
// Generates dummy products for testing 
router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});
******************************************************************/
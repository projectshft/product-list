const router = require("express").Router();
const faker = require("faker");
const { Product, Review } = require("../models/product");

// GET /products?page=# --- Returns: products w/ pagination
router.get('/products', (req, res) => {
  const page = req.query.page || 1
  const perPage = 9
  const skipNum = ((page * perPage) - perPage);
  
  Product.find({}).skip(skipNum).limit(perPage).exec(function (err, products) {
    if (err) return console.log(err);
    res.send(products)
  });
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

  Review.find({ product: productId }).skip(skipNum).limit(perPage).exec(function (err, product) {
    if (err) return console.log(err);
    res.send(product)
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

module.exports = router;


/*
TODO:

// POST /products/:product/reviews --- Creates new review in the db, adds to existing product

POST /products/:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.

DELETE /products/:product: Deletes a product by id

DELETE /reviews/:review: Deletes a review by id
*/


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

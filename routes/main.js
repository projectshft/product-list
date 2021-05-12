const router = require("express").Router();
const faker = require("faker");
const { Product, Review } = require("../models/product");

//GET /products?page=#: Returns products w/ pagination
router.get('/products', (req, res) => {
  const page = req.query.page || 1
  const perPage = 9
  const skipNum = ((page * perPage) - perPage);
  
  Product.find({}).skip(skipNum).limit(9).exec(function (err, products) {
    if (err) return console.log(err);
    res.send(products)
  });
});

//GET /products/:product: Returns a specific product by its id
//sampple route for testing: /products/609c0adf8ed5031bdbd78373
router.get('/products/:product', (req, res) => {
  const productId = req.params.product

  Product.findById(productId).exec(function (err, product) {
    if (err) return console.log(err);
    res.send(product)
  });
});





//
/* 
GET /products/:product: Returns a specific product by its id

GET /products/:product/reviews: Returns ALL the reviews for a product, but limited to 4 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an optional page query parameter to paginate.

POST /products: Creates a new product in the database

POST /products/:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.

DELETE /products/:product: Deletes a product by id

DELETE /reviews/:review: Deletes a review by id
 */

module.exports = router;


/*****************************Testing*****************************

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


*/

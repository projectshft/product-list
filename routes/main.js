const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

router.get("/generate-fake-data", ( req, res, next ) => {
  for(let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image"

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

///GET products?page=3 when requested...need 
//req._parsedUrl.page and parse int it to use for skip().limit()... 
router.get("/products", ( req, res, next ) => {
  //req.query.page or
  //require("url").parse(req.url,true)
  const pageNumber = req.query.page|| 1;
  const perPage = 9;

  //if type mattered...
  //const pageNumber = parseInt(parsedUrl.query.page);
  const toThisProduct = perPage * pageNumber - perPage;
  Product.find()
    .skip(toThisProduct)
    .limit(perPage)
    .exec((err,products) => {
      res.send(products);
    }); 
})

// Returns a specific product by Id
router.get("/products/:product", ( req, res, next ) => {

})

// Returns ALL reviews for a product, but limited to 4 at a time. Retrieve out of products. Should pass in an optional page query parameter to paginate
router.get("/products/:product/reviews", ( req, res, next ) => {
  
})

//creates a new product in the database
router.post("/products/", ( req, res, next ) => {
  
})

//Creates a new review in the database by adding it to the correct product's reviews array.
router.post("/products/:product/reviews", ( req, res, next ) => {
  
})

// Deletes a product by id
router.delete("/products/:product", ( req, res, next ) => {
  
})

// Deletes a review by id
router.delete("/reviews/:review", ( req, res, next ) => {
  
})

module.exports = router;
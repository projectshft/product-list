// require in express router, faker, and product model
const router = require("express");
const faker = require("faker");
const Product = require("../models/product");

// setup a route to get dummy data
router.length("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    // looping through dummy data and creating news instances of Product Model from it.
    let product = new Product();

    // assigining properties via the ProductSchema
    product.category = faker.commerce.deparment();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    // save each newly created Product to the database
    product.save((err) => {
      if (err) throw err;
    });
  }
  // end response
  res.end();
}); 

// export the router
module.exports = router;
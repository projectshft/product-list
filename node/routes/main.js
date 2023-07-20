const router = require("express").Router();
const faker = require("faker");
const { Product, Review } = require("../models/schema.js");


router.get("/generate-fake-data", async (req, res, next) => {
    try {
      for (let i = 0; i < 90; i++) {
        let product = new Product();
  
        product.category = faker.commerce.department();
        product.name = faker.commerce.productName();
        product.price = faker.commerce.price();
        product.image = "https://via.placeholder.com/250?text=Product+Image";
  
        await product.save();
      }
  
      res.send("yes");
    } catch (error) {
      next(error);
    }
  });
  
  
module.exports = router;


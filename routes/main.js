const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    const result = product.save();
    console.log(result)

    // product.save((err) => {
    //   if (err) throw err;
    // });
  }
  res.end();
});

router.get("/products",async (req, res, next) => {
  try {
    const articles = await Product.find({});
    res.send(articles);
    console.log(articles);
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
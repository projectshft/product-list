const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

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
    res.end();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/products", async (req, res, next) => {
  try {
    const perPage = 9;
    const page = req.query.page || 1;

    const products = await Product.find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec();

    res.send(products);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
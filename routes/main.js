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

    product.save();
  }
  res.end();
});

router.get("/products", (req, res, next) => {
  const page = req.query.page || 1;
  const limit = 10;

  Product.find({})
    .skip(page * limit - limit)
    .limit(limit)
    .exec().then((products) => {
      res.send(products);
    });

});

router.get('/products/:product', (req, res) => {

  const productId = req.params.product;

  Product.findOne({_id: productId})
    .exec().then((products) => {
      let productsResult;

      productsResult = products;

      if(!productsResult) {
        return res.status(404).send("Invalid product ID");
      }
      res.send(productsResult)
    });
});

module.exports = router;
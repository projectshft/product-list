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
  run()
  async function run() {
    try {
      const perPage = 9;
      const page = req.query.page || 1;

      let products = await Product
        .find()
        .skip(perPage * page)
        .limit(perPage)
        .exec()
          res.status(200).send(products)
      } catch (e) {
          console.log(e.message);
      }
  }  
});


module.exports = router;
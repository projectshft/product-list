const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 20; i++) {
    let product = new Product();
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews = [];

    for (let i = 0; i < 6; i++) {
      let review = new Review();
      review.userName = faker.animal.snake().replaceAll(" ","") + faker.datatype.number(1000);
      review.text = faker.lorem.sentence();
      review.product = product._id;

      review.save((err) => {
          if (err) throw err;
      });

      product.reviews.push(review);
    }

    product.save((err) => {
        if (err) throw err;
    });
  }
  res.end();
});

module.exports = router;
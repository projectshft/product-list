const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");
var products = require("./productsRouter");
var reviews = require("./reviewsRouter");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = faker.image.imageUrl();

    product.save(err => {
      if (err) throw err;
    });

    for (let j = 0; j < 10; j++) {
      let review = new Review();
      review.userName = faker.internet.userName();
      review.text = faker.lorem.sentences();
      review.product = product._id;

      review.save(err => {
        if (err) throw err;
      });

      product.reviews.push(review._id);
    }
  }
  res.end();
});

router.use("/products", products);
router.use("/reviews", reviews);

module.exports = router;

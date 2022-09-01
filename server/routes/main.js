const router = require("express").Router();
const Product = require("../models/products");
const Review = require("../models/reviews");
const { faker } = require("@faker-js/faker");

// Step 1: Populate DB w/ fake products
router.get("/generate-fake-products", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews = [];

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.send('Generated products');
});

// Step 2: Populate DB w/ fake reviews
router.get("/generate-fake-reviews", async (req, res, next) => {
  for (let i = 0; i < 1000; i++) {
    let review = new Review();
    let [product] = await Product.aggregate().sample(1);
    const rand = (num) => Math.ceil(Math.random() * num)

    const randTextGen = [
      faker.lorem.paragraph(rand(5)),
      faker.lorem.paragraphs(rand(3)),
      faker.lorem.sentence(rand(10) + 2),
    ]

    review.userName = faker.internet.userName();
    review.text = randTextGen[rand(3) - 1];
    review.product = product;
    
    review.save((err) => {
      if (err) throw err;
    });

    Product.findByIdAndUpdate(product._id).exec((err, product) => {
      if (err) throw err;

      product.reviews.push(review);
      product.save();
    });
  }
  res.send('Generated reviews');
});

module.exports = router;
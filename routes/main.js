const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();
    let review = new Review();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    
    review.userName = faker.name.firstName();
    review.text = faker.lorem.sentence();
    review.product = product._id;

    product.reviews.push(review);

    product.save()
      .catch((err) => {
        throw err;
      })

    review.save()
      .catch((err) => {
        throw err;
      })

  }
  res.end();
});

router.get("/products", (req, res, next) => {
  const perPage = 9;

  const page = req.query.page || 1;

  Product.find()
    .skip( perPage * page - perPage)
    .limit(perPage)
    .exec()
    .then((products) => {
      Product.count().exec()
      .then((count) => {
        res.send({
          products,
          count
        })
      })
      .catch((err => {
        res.send(err);
      }))
    })
    .catch((err) => {
      res.send(err);
    })
});

module.exports = router;
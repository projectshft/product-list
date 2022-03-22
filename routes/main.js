const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

router.get("/products", (req, res, next) => {
  const perPage = 9;

  const page = req.query.page || 1;

  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
        
      });
    });
});

router.get("/products/:product", (req, res, next) => {

  const productId = req.params.product;

  Product.findOne({_id: productId})
    .exec((err, product) => {
      if (err) return next(err);

      res.send(product);
    });
});

router.get("/products/:product/reviews", (req, res, next) => {

  const productId = req.params.product;

  Product.findOne({_id: productId}, 'reviews')
    .limit(4)
    .exec((err, product) => {
      if (err) return next(err);

      res.send(product);
    });
});

router.post("/products", (req, res, next) => {
  let product = new Product();

  product.category = faker.commerce.department();
  product.name = faker.commerce.productName();
  product.price = faker.commerce.price();
  product.image = "https://via.placeholder.com/250?text=Product+Image";

  product.save((err) => {
    if (err) throw err;
  });

})

router.post("/products/:product/reviews", (req, res, next) => {
  const productId = req.params.product;

  let review = new Review();
  review.userName = faker.internet.userName();
  review.text = faker.string();

  review.save((err) => {
    if (err) throw err;
  });

  const product = Product.findOne({_id: productId});

  product.reviews.push(review);

  product.save();
})


module.exports = router;
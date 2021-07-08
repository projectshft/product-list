const router = require("express").Router();
const async = require("async");
const faker = require("faker");
const Product = require("../models/product").Product;
const Review = require("../models/review").Review;

router.get("/products", (req, res, next) => {
  const resultsPerPage = 9;
  const { page } = req.query || 1;

  Product.find({})
    .skip(resultsPerPage * page - resultsPerPage)
    .limit(resultsPerPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

router.get("/products/:product", (req, res, next) => {
  const { product } = req.params;

  Product.find({ _id: product }).exec((err, product) => {
    if (err) return next(err);

    res.send(product);
  });
});

router.get("/products/:product/reviews", (req, res, next) => {
  const { product } = req.params;
  const { page } = req.query || 1;
  const resultsPerPage = 4;

  Review.find({ product_id: product })
    .skip(resultsPerPage * page - resultsPerPage)
    .limit(resultsPerPage)
    .exec((err, review) => {
      if (err) return next(err);

      res.send(review);
    });
});

router.post("/products", (req, res, next) => {
  const { category, name, price, image } = req.body;

  const newProduct = new Product({
    name: name,
    category: category,
    price: price,
    image: image,
  });

  newProduct.save((err, product) => {
    if (err) return next(err);

    res.send(product);
  });
});

router.post("/products/:product/reviews", (req, res, next) => {
  const { userName, text, product_id } = req.body;
  const { product } = req.params;

  // How do I add the Object Id of the product?
  const newReview = new Review({
    userName: userName,
    text: text,
    product_id: product_id,
  });

  // newReview.save();
  res.send(newReview);
});

router.delete("/products/:product", (req, res, next) => {
  const { product } = req.params;

  Product.remove({ _id: product }).exec((err, product) => {
    if (err) return next(err);

    res.send(product);
  });

  Review.remove({ product_id: product }).exec((err, review) => {
    if (err) return next(err);

    res.send(review);
  });
});

router.delete("/reviews/:review", (req, res, next) => {});

// router.get("/generate-fake-data", (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product();

//     product.category = faker.commerce.department();
//     product.name = faker.commerce.productName();
//     product.price = faker.commerce.price();
//     product.image = "https://via.placeholder.com/250?text=Product+Image";

//     product.save((err) => {
//       if (err) throw err;
//     });
//   }
//   res.end();
// });

module.exports = router;

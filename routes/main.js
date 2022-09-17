const router = require("express").Router();
const { faker } = require("@faker-js/faker");
const { Product, Review } = require("../models/product");
const { nextTick } = require("process");

// Data set up
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

// Set up reviews
// Product.find({})
//   .exec((err, res) => {
//     const Products = res;
//     for (let i=0; i<5; i++) {
//       let productIndex = Math.floor(Math.random() * 90);
//       let reviewedProduct = Products[productIndex];
//       let newReview = new Review({
//         username: faker.internet.userName(),
//         text: faker.lorem.text(),
//         product: reviewedProduct._id,  
//       });
//       newReview.save();
//       reviewedProduct.reviews.push(newReview);
//       reviewedProduct.save();
//     };
//   });

router.get("/products", (req, res) => {
  // GET all products
  let page = req.query.page;
  // If no query is passed in, then default to the first page
  if (!page) {
    page = 1;
  }
  Product
    .find({})
    .skip((page -1) * 9)
    .limit(9)
    .populate("reviews")
    .exec((err, products) => {
      (err) ? next(err) : res.send(products);
    });
});

router.get("/products/:product", (req, res) => {
  // GET a specific product by its id
  const productId = req.params.product;
  Product
    .find({ _id: productId })
    .populate("reviews")
    .exec((err, product) => {
      res.send(product);
    });
});

router.get("/products/:product/reviews", (req, res) => {
  // GET all reviews of a specific product
  let page = req.query.page;
  if (!page) {
    page = 1;
  }
  const productId = req.params.product;
  Product
    .find({ _id: productId })
    .populate("reviews")
    .exec((err, product) => {
      let lowerLimit = (page - 1) * 4;
      let upperLimit = lowerLimit + 4;
      res.send(product[0].reviews.slice(lowerLimit, upperLimit));
    });
});

router.post("/products", (req, res) => {
  // POST a new product
  let newProduct = req.body;
  newProduct.save();
  res.send(newProduct);
});

router.post("/products/:product/reviews", (req, res) => {
  let newReview = req.body;
  const productId = req.params.product;
  Product
    .find({ _id: productId })
    .exec((err, product) => {
      if (!err) {
        newReview.save();
        product.reviews.push(newReview);
        product.save();
        res.send(product);
      }
    });
});

router.delete("/products/:product", (req, res) => {
  let productId = req.params.product;
  Product
    .deleteOne({ _id: productId })
    .then(() => {
      res.send();
    });
});

router.delete("/reviews/:review", (req, res) => {
  let reviewId = req.params.review;
  Review
    .deleteOne({ _id: reviewId })
    .then(() => {
      res.send();
    });
});

module.exports = router;

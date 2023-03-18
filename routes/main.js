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

// TODO: GET product by id
router.get("/products/:product", (req, res, next) => {
  const productId = req.params.product;
  
  Product.find({ _id: productId })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    })
})

// TODO: GET all the reviews for a product but limited to 4 at a time


// TODO: POST create a new product in the DB
router.post("/products", (req, res, next) => {
  let product = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    reviews: []
  })

  product.save();
  res.writeHead(200, "Product successfully added.")
  return res.end();
})

// TODO: POST create a new review
router.post("/products/:product/reviews", (req, res, next) => {
  let productId = req.params.product;
  let review = new Review();

  Product.findById(productId)
    .then((product) => {
      review.userName = req.body.userName;
      review.text = req.body.text;
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

    })
    .catch((err) => {
      res.send(err);
    })
})

// TODO: DELETE a product by id
router.delete("/products/:product", (req, res, next) => {
  const productId = req.params.product;

  Product.deleteOne({ _id: productId })
    .exec()
    .then((result) => {
      res.writeHead(200, "Product successfully deleted.")
      res.send()
    })
    .catch((err) => {
      res.send(err);
    })
})

// TODO: DELETE a review by id
router.delete("/reviews/:review", (req, res, next) => {
  const reviewId = req.params.review;

  Review.deleteOne({ _id: reviewId })
    .exec()
    .then((result) => {
      res.writeHead(200, "Review successfully deleted.")
      res.send()
    })
    .catch((err) => {
      res.send(err);
    })
})

module.exports = router;
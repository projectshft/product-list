const router = require("express").Router();
const faker = require("faker");
const product = require("../models/product");
const Product = require("../models/product");

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


router.get("/products/:productId", (req, res, next) => {
  
});

router.get("/products/:productId/reviews", (req, res, next) => {
  
});

router.post("/products", (req, res, next) => {
  let product = new Product({category: " ", name: " ", price: " ", image: " ",})
  product.save()
});

router.post("/products/:productId/reviews", (req, res, next) => {
  
});

router.delete("/products/:productId", (req, res) => {
  Product.remove({ObjectId, ref: "product" }, (err) => {
    if (err) throw err;
      
    console.log("Product deleted!");
  });
});

router.deletr("/products/:reviewId", (req, res) => {
  Review.remove({ ObjectId, ref: "review" }, (err) => {
    if (err) throw err;
      
    console.log("Review deleted!");
  });
  
});

module.exports = router;
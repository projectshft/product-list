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

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

router.get("/products", (req, res, next) => {
  const pageNum = req.query.page || 1;
  const amountToSkip = pageNum * 9 - 9;
  
    Product.find().skip(amountToSkip).limit(9).exec((err, products) => {
      if (err) {
        next(err)
      }
      else {
        res.send(products)
      }
    });
});

router.get("/products/:product", (req, res) => {
  const productId = req.params.product;
  Product.findById(productId).exec((err, product) => {
    if (err) res.status(400).send(err.message);

    res.send(product);
  });
});

router.get("/products/:product/reviews", (req, res) => {
  const productId = req.params.product;
  Product.findById(productId).exec((err, product) => {
    if (err) res.status(400).send(err.message);
    res.send(product.reviews);
  });
});

//ADD PAGINATION

router.post("/products", (req, res) => {
  if (req.body.category && req.body.name && req.body.price && req.body.image) {
    Product.create({
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      reviews: req.body.reviews
    })
  } else {
    res.status(400).send('all fields must be filled out')
  }
});

router.post("/products/:product/reviews", (req, res) => {
  const productId = req.params.product;

  if (req.body.username && req.body.text) {
    Product.findById(productId).exec((err, product) => {
      const newReview = {
        username: req.body.username,
        text: req.body.text
      };
      product.reviews.push(newReview);
      product.save();
    });
   
  }
  else {
    res.status(400).send('all fields must be filled out')
  }
});

router.delete("/products/:product", (req, res) => {
  const productId = req.params.product;

  Product.deleteOne({_id: productId}).exec((err, product) => {
    res.send("product has been removed");
  });
})

router.delete("/reviews/:review", (req, res) => {
  const reviewId = req.params.review;

  Product.find({'reviews._id': reviewId}).exec((err, product) => {
    product[0].reviews.pull(reviewId);
    res.send(product);
  });
});


module.exports = router;
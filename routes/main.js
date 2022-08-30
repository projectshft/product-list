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
  res.end();
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
  res.end();
});

// GET all products (nine per page)
router.get("/products", (req, res, next) => {
  const perPage = 9;
  
  // return the first page by default
  const { page } = req.query || 1;

  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .populate('reviews')
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

// GET product by ID
router.get("/products/:productId", (req, res, next) => {
  const { productId } = req.params;
  
  Product.findById(productId)
    .populate('reviews')
    .exec((err, product) => {
      if (err) return next(err);
      res.send(product);
    });
});

module.exports = router;
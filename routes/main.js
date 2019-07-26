const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

// This route should be generating all the fake data necessary
// for this project.  It should create products and 3 reviews for
// each product.  These reviews will be pushed on to the associated
// product's reviews array.
router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image =
      "https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png";
    product.reviews = [];

    for (let i = 0; i < 3; i++) {
      const review = new Review();
      review.userName = faker.internet.userName();
      review.text = faker.lorem.sentence();
      review.product = product;
      review.save();
      product.reviews.push(review);
    }
    product.save();
  }
  res.end();
});

//This route should grab and paginate all the products
//If a page query is provided and if no query is provided
//page of products
router.get("/products", (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;

  //Check for and assign price and category if they are in
  //the query
  const categoryQuery = req.query.category;
  const priceSort = req.query.price;
  let priceArg;

  //Value for the sort if the price is lowest or highest, doing it outside
  //of the mongoose query to reduce clutter
  if (priceSort) {
    if (priceSort == "lowest") priceArg = 1;
    if (priceSort == "highest") priceArg = -1;
  }
  //Checks if there is a value for category in the request query
  if (categoryQuery) {
    let query = Product.find({ category: categoryQuery })
      .skip((page - 1) * perPage)
      .sort({ price: priceArg });
    //If a price sort is sent in the query, sort the price by the value
    //provided in the query
    if (priceArg) {
      query.sort({ price: priceArg });
    }
    query.limit(perPage).exec((err, products) => {
      Product.countDocuments({ category: categoryQuery }, (err, count) => {
        res.send({ totalItems: count, products: [...products] });
      });
    });
  }
  //If there is no category provided it will grab all of the products
  else {
    let query = Product.find().skip((page - 1) * perPage);
    //If a price sort is sent in the query, sort the price by the value
    //provided in the query
    if (priceArg) {
      query.sort({ price: priceArg });
    }
    query.limit(perPage).exec((err, products) => {
      Product.countDocuments((err, count) => {
        res.send({ totalItems: count, products: [...products] });
      });
    });
  }
});

//This route should find the product provided in the request parameters
//and return the product found in the response
router.get("/products/:product", (req, res) => {
  const currentProductId = req.params.product;
  console.log(currentProductId);
  Product.findById(currentProductId)
    .exec()
    .then(data => res.send(data));
});

//The should return all the reviews but limited to 40 at a time
//Because I am referencing the reviews by reference and population
//I have a reviews collection to query, making grabbing the reviews
//easier
router.get("/reviews", (req, res, next) => {
  const perPage = 40;
  const page = req.query.page || 1;
  Review.find()
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      Product.countDocuments((err, count) => {
        res.send(reviews);
      });
    });
});

//This should create a new product populating the new instance of the
//model with information provided in the body of the request then
//saving the new instance of the model to the database and returning
//the new item
router.post("/products", (req, res) => {
  let product = new Product();
  product.category = req.body.category;
  product.name = req.body.name;
  product.price = req.body.price;
  product.image = req.body.image;
  product.reviews = [];

  product.save((err, newProduct) => {
    if (err) throw err;
    res.send(newProduct);
  });
});

//This route should create a new review in the database by adding the review
//to the correct product that will be found by productId passed in the
//request params, it will return a new object containing the normal product
//instance that has a review added along with an added key value pair
//newReview to show the client the new review that had been added
router.post("/:product/reviews", (req, res) => {
  const currentProductId = req.params.product;
  Product.findById(currentProductId).exec((error, productData) => {
    if (error) throw error;
    let review = new Review({
      userName: req.body.userName,
      text: req.body.text,
      product: productData
    });
    review.save();
    productData.reviews.push(review);
    productData.save((err, savedProduct) => {
      if (err) throw err;
      res.send({ ...savedProduct._doc, newReview: review });
    });
  });
});

//This route should find and remove a product by the id provided
//in the parameters of the route.
router.delete("/products/:product", (req, res) => {
  const currentProductId = req.params.product;
  Product.findByIdAndDelete(currentProductId).exec((error, response) => {
    if (error) throw error;
    console.log(response);
    res.send(response);
  });
});

//This route should find and remove a review by the id provided
//in the parameters of the route.
router.delete("/reviews/:review", (req, res) => {
  const currentReviewId = req.params.review;
  Review.findByIdAndDelete(currentReviewId).exec((error, response) => {
    if (error) throw error;
    console.log(response);
    res.send(response);
  });
});
module.exports = router;

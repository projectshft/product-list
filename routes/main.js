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

// Router param that acts as a helper function.
// Retrieves the review model through the query params id. 
router.param("review", (req, res, next, id) => {
  Review
  .find({_id: id})
  .exec((err, review) => {
    if (err || review.length === 0)
      req.error = '404';
    else
      req.review = review[0];
    next();
  })
})

router.get("/products", (req, res, next) => {
  const perPage = 9;

  // Return the first page by default
  const page = req.query.page || 1;

  // Build query to pass to Product model
  let query = {};

  if (req.query.category) {
    query.category = {$regex: req.query.category, $options: "i"}
  }
  
  if (req.query.search) {
    query.name = {$regex: req.query.search, $options: "i" }
  }

  const priceQuery = {price: 0}
  if (req.query.price == "highest") {
    priceQuery.price = -1
  } else if (req.query.price == "lowest") {
    priceQuery.price = 1
  } else {
    priceQuery.price = null;
  }

  Product.find(query, null, { sort: priceQuery })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count({query}, function(err, count) {
        if (err) console.log("There was an error with retrieving /products", err)
      })
      if (products.length <= 0) {
        res.end("No products match.")
      } else {
        console.log("Number of products: ", products.length);
        res.send(products);
        // TODO MAYBE frontend app will need the 'count' of products based on all the query params.
        // return products.length;

      }
    });
  });

router.get("/products/:product", (req, res, next) => {
  Product.find({_id: req.params.product}, function(err, result) {
    if (err) console.log("There was an error: ", err);
    if (result == undefined) {
      res.send("The product doesn't seem to exist.")
    } else {
      console.log("This is the result: ", result);
      res.send(result);
    }
  });
});

router.post("/products", (req, res, next) => {
  let newProduct = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: 'https://via.placeholder.com/250?text=Product+Image',
    reviews: [],
  });
  newProduct.save();
  res.send(newProduct);
});

router.delete("/products/:product", (req, res, next) => {
  Product.deleteOne({_id: req.params.product}, function (err, products) {
    if (err) return handleError(err);
    res.send(products)
  });
});

// POST /products/:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.
router.post("/products/:product/reviews", (req, res) => {
  // if (req.error = "404") {
  //   res.send("Sorry, that product doesn't seem to exist.")
  //   res.writeHead(404, "Product not found")
  //   return res.end();
  // }

  const newReview = new Review({
    text: req.body.text,
    username: req.body.username,
    product: req.params.product
  });

  console.log(newReview);
  newReview.save().then(() => {
    Product.findOneAndUpdate({_id: req.params.product}, 
      { $push: { reviews: newReview }}, function(err, result) {
        if (err) console.log("There was an error", err);
        res.send(result);
      });
  })
});

router.get("/products/:product/reviews", (req, res, next) => {
  const pageNum = req.query.page || 1;

  Review
    .find({product: req.params.product})
    .skip(4 * pageNum - 1)
    .limit(4)
    .exec((err, reviews) => {
      Review.count().exec((err, count) => {
        if (err) console.log(err);
        res.send(reviews);
      })
    })
});

// DELETE /reviews/:review: Deletes a review by id
router.delete("/reviews/:review", (req, res) => {

  const reviewToDelete = req.review;
  console.log(reviewToDelete);

  Review.findByIdAndDelete({_id: req.params.review}, function(err, results) {
    if (err) console.log("There was an error deleting that review: ", err);
  });

  Product.findByIdAndUpdate({_id: reviewToDelete.product}, {'$pull': {'reviews': reviewToDelete._id} })
  .then(() => {
    console.log('Review reference removed from product.')
    res.send(reviewToDelete.product)
  })
  .catch(() => {
    res.writeHead(500, "Internal server error!")
    return res.end();
  })

  
});



module.exports = router;
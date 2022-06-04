const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");
const queryString = require('querystring');

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();
    let review = new Review();

    review.username = faker.internet.userName();
    review.text = faker.commerce.productName();
    review.product = product._id;

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews = [review._id];
    
    product.save((err) => {
      if (err) throw err;
    });

    review.save((err) => {
      if (err) throw err;
    });

  }
  res.end();
});

router.get("/products", (req, res, next) => {
  const perPage = 9;

  const page = req.query.page || 1;

  //optional category search
  if(req.query.category){
    const category = req.query.category[0].toUpperCase() + req.query.category.substring(1);

    Product.find({ category: category })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((err, products) => {
        Product.count().exec((err, count) => {
          if (err) return next(err);

          res.send(products);
        });
      });
  } else if(req.query.price){
    //sort by highest or lowest price
    const factor = req.query.price;

    if(factor == "highest" || factor == "lowest"){
      let order = null;
      
      if(factor == "highest"){
        order = "descending";
      };

      if(factor == "lowest"){
        order = "ascending";
      };

      Product.find({})
        .sort({ price: order })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec((err, products) => {
          Product.count().exec((err, count) => {
            if (err) return next(err);

            res.send(products);
          });
        });
    }
  } else {
    //get all products
    Product.find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((err, products) => {
        Product.count().exec((err, count) => {
          if (err) return next(err);
  
          res.send(products);
        });
      });
  }

});

/* ===================
  GET products by id
  =================== */
router.get("/products/:product", (req, res, next) => {
  const { product } = req.params;

  Product.findOne({ _id: product })
    .populate("reviews")
    .exec((err, returnProduct) => {
      if (err) return next(err);

      res.send(returnProduct);
    });
})

/* =====================================
  GET all reviews for a product (limit 4)
  ===================================== */
router.get("/products/:product/reviews", (req, res, next) => {
  const { product } = req.params;
  const perPage = 4;
  const page = req.query.page || 1;
 
  Product.findOne({ _id: product })
    .populate({
      path: "reviews",
      options: { skip: perPage * page - perPage, limit: perPage }
    })
    .exec((err, returnProduct) => {
      if (err) return next(err);
  
      if(returnProduct.reviews) {
        res.send(returnProduct.reviews);
      } else {
        res.write("No reviews yet.")
      }
    });
});

/* ===================
  POST new product
  =================== */
router.post("/products", (req, res) => {
  const info = req.body;
  if(info.name) {
    const product = new Product({
      name: info.name,
      category: info.category,
      price: info.price,
      image: info.image,
      reviews: []
    });

    product.save()
    res.end("Product saved.")
  } else {
    res.end(`Cannot send empty post request. Please provide at least a "name" key.`)
  }
});

/* ===========================
  POST new review to a product
  ========================== */
router.post("/products/:product/reviews", (req, res, next) => {
  const { product } = req.params;
  const info = req.body;
  if(info.username && info.text) {
    const review = new Review({
      username: info.username,
      text: info.text,
      product: product
    });
    
    review.save();

    Product.findOne({ _id: product }, (err, product) => {
      if (err) return next(err);

      product.reviews.push(review);
      product.save();
    });

    res.end("Review saved.")
  } else {
    res.end(`Cannot post empty review. Please provide "username" and "text" keys.`);
  }
});

/* ===================
  DELETE product by id
  =================== */
router.delete("/products/:product", (req, res, next) => {
  const { product } = req.params;

  Product.findOne({ _id: product }, (err, product) => {
    if (err) return next(err);

    product.remove((err) => {
      if (err) return next(err);

      res.end(`Successfully deleted ${product.name}.`)
    })
  })
});

/* ===================
  DELETE review by id
  =================== */
router.delete("/reviews/:review", (req, res, next) => {
  const { review } = req.params;

  Review.findOne({ _id: review }, (err, review) => {
    if (err) return next(err);

    review.remove((err) => {
      if (err) return next(err);

      res.end(`Successfully deleted ${review.username}'s review.`)
    })
  })
})

module.exports = router;
const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product.js");
const Review = require("../models/review.js")

router.get("/generate-fake-data", (req, res, next) => {
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

router.get("/products", (req, res, next) => {
  const query = req.query.query || null;
  const category = req.query.category || null;
  const price = req.query.price || null;

  const page = req.query.page || 1;
  const perPage = 9;

  let findObj = {};
  findObj.searches = {};
  findObj.pricing = {};

  //formatting searches
  if(query) {
    let sortedQuery = query[0].toUpperCase() + query.substring(1)
    findObj.searches.name = {"$regex": sortedQuery};
  };

  //formatting categories
  if(category) {
    let sortedCategory = category[0].toUpperCase() + category.substring(1)
    findObj.searches.category = sortedCategory;
  };

  //formatting price
  if(price) {
    if (price.toLowerCase() === 'highest') {
      findObj.pricing.price = -1;
    } else {
      findObj.pricing.price = 1;
    }
  };

  Product.find(findObj.searches)
    .sort(findObj.pricing)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});


//specific product
router.get("/products/:product", (req, res, next) => {
  console.log(req.params)
  console.log(req.params.product)

  const productId = req.params.product;

  Product.findOne({_id: productId})
    .exec((err, product) => {
      if (err) {
        console.log(err);
        return next(err);
      };
      res.send(product);
    });
});

//specific product reviews
router.get("/products/:product/reviews", (req,res,next) => {
  let {product} = req.params

   Product.findOne({_id: product})
    .populate("reviews")
    .limit(4)
    .exec((err, reviews) => {
      if(err) {
        console.log(err)
      }
        else {
      res.send(reviews.reviews)
      }
    });
});

//for new products in database
router.post("/products", (req, res, next) => {
  let product = new Product();

  product.category = faker.commerce.department();
  product.name = faker.commerce.productName();
  product.price = faker.commerce.price();
  product.image = "https://via.placeholder.com/250?text=Product+Image";
  product.reviews = [];
  product.save((err) => {
    if (err) throw err;
  });
  return res.send(product)
})

//for new review on product 
router.post("/products/:product/reviews", (req, res, next) => {
  let review = new Review();
  review.username = "Big_Dog";
  review.text = "5/5";

  let {product} = req.params

  Product.findOne({_id: product})
    .exec((err, product) => {
      if(err) {
        console.log(err)
      };

      review.save((err) => {
        if (err) throw err;
      });
      
      if (product.reviews) {
        product.reviews.push(review);
        res.send(product);
      };
      product.save();
    });
});

//deletes a product
router.delete("/products/:product", (req, res, next) => {
  let {product} = req.params
  
  Product.remove({_id: product})
    .exec((err, product) => {
      if (err) {
        console.log(err);
      };
      res.send("Successfully removed product.");
    })
})

// deletes a product's review * couldn't figure out how to update the products reviews 
router.delete("/products/:product/reviews/:review", (req, res, next) => {
  let {product, review} = req.params

  Product.findOne({_id: product})
    .exec((err, product) => {
      if(err) {
        console.log(err)
      };
      Review.deleteOne({_id: review})
        .exec((err, review) => {
          if (err) {
            console.log(err);
          };
          console.log("Review Deleted");
          // res.end();
        })
      res.send(product);
    });
});

module.exports = router;
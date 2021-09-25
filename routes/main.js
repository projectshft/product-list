const router = require("express").Router();
const faker = require("faker");
const { isValidObjectId } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const { db } = require("../models/product");

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


router.get("/api", function(req, res, next) {
  console.log(req);
  res.json({message: "API is working properly"});
});


router.get("/products", (req, res, next) => {
  const perPage = 9;
  // return the first page by default
  const page = req.query.page || 1;

  // Build the query that we'll be searching for
  var query = {}

  // Grab query string (optional)
  if (req.query.query) {
    query.name = {$regex: req.query.query, $options: "i"};
  }

  // Grab category (optional)
  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }; 

  if (req.query.category) {    
    const category = capitalizeFirstLetter(req.query.category);
    query.category = category;
  };

  // Sort from highest to lowest price or vice versa (optional)
  const priceQuery = {price: 0}
  if (req.query.price == "highest") {
    priceQuery.price = 1
  } else if (req.query.price == "lowest") {
    priceQuery.price = -1
  } else {
    priceQuery.price = null;
  }

  // console.log(query);

  // Find the product matching the params provided
  Product.find(query, null, { sort: priceQuery})
  .skip(perPage * page - perPage)
  .limit(perPage)
  .exec(function(err, result) {
    if (err) console.log(err);
    if (result.length === 0 ){
      res.send(`Your query for ${query.category} did not match anything.`)
    } else {
      // console.log(result);
      const resultArray = Object.entries(result);
      // console.log(resultArray);
      res.send(resultArray);
    }
  });
});


router.get("/products/:product", (req, res, next) => {
  // Grab id from request.params.product
  Product.find({ _id: req.params.product}, (err, product) => {
    if (err) {
      console.log(err)
    } else {
      res.send(product);
    }
  })
});

router.get("/products/:product/reviews", (req, res, next) => {
  const perPage = 4;
  const page = req.query.page || 1;
  console.log(page);


    Product
      .findOne({_id: req.params.product})
      .populate('reviews', null, { perDocumentLimit:  4} )
      .exec((err, result) => {
        
        const reviews = Object.entries(result.reviews);        
      

        if (page == 1) {
         res.send(reviews.slice(0,3));
        } else if (page == 2) {
          res.send(reviews.slice(4,7));        
      } else if (page == 3) {
        res.send(reviews.slice(8-11));
      } else {
        res.send(reviews.slice(0,3));
      }
    })
});

router.post("/products", (req, res, next) => {
  // user will submit a form with product information
  let newProd = new Product({
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      image: 'https://via.placeholder.com/250?text=Product+Image',
      reviews: [],
    });
  newProd.save();
  res.send(newProd);


});

router.post("/products/:product/reviews", (req, res, next) => {
  Product.findOne({_id: req.params.product}, (err, result) => {
    if (err) {
      return console.log(err);
    }
    const newReview = new Review({
      userName: req.body.userName,
      text: req.body.text,
      product: result._id
    })
    newReview.save();
    result.reviews.push(newReview);
    result.save();
    console.log(result.reviews);
    res.send(result.reviews);
  })
  next();
});

router.delete("/products/:product", (req, res, next) => {
  Product.findOneAndDelete({_id: req.params.product}, (err, result) => {
    if(err) console.log(err);
    res.send(`Successful deletion.`)
    console.log(`Item deleted: ${result}`);
  });
  next();
});

router.delete("/reviews/:review", (req, res, next) => {
  const reviewToDelete = req.review;

  Product.updateOne({_id: reviewToDelete.product}, {$pull: {reviews: reviewToDelete._id}}).then(() => {
    Review.deleteOne({_id: reviewToDelete._id}, (err) => {
      if (err) console.log(err);
    })
    res.send("Review removed from product");
    res.end();
  });
  

});

module.exports = router;

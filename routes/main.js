const router = require("express").Router();
const { faker } = require("@faker-js/faker");
const Product = require("../models/product");
const Review = require("../models/review");
const mongoose = require("mongoose");
const catchAsync = require("../middleware/catchAsync");
const AppError = require("../errors/errClass");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    reviews = [];
    product.save((err) => {
      if (err) {throw err;}
    });
  }
  res.end();
});

router.get("/generate-fake-reviews", (req, res, next) => {
  const generateRating = function() {
    const multiplier = 6;
    let randomStars = Math.floor(Math.random() * multiplier);
    if(randomStars === 0) {
      return randomStars += 1;
    } else return randomStars;
  }

  for (let i = 0; i < 540; i++) {
    let review = new Review();
    review.userName = faker.name.fullName();
    review.text = faker.lorem.lines();
    review.rating = generateRating();
    review.save((err) => {
      if (err) {throw err;}
      });
    }
    res.end();
  });  

router.get("/add-reviews-to-products", catchAsync(async(req, res) => {

  const productCount = await Product.estimatedDocumentCount();
  const reviewCount = await Review.estimatedDocumentCount();
  const reviewsPerProduct = Math.floor(reviewCount/productCount);
  const productQuery = Product.find();

  let iteration = 1;
  const limit = reviewsPerProduct;
  for await(const product of productQuery) {
    let skips = (iteration - 1) * limit;
    Review.find().skip(skips).limit(limit).exec((err, reviews) => {
      if (err) { throw err;}
      reviews.forEach((review) => {
        product.reviews.push(review);
      });
      product.save();
    })
    iteration += 1;   
  }
  res.end();
  })
);

router.get("/products", catchAsync(async(req, res) => {
  const pageSize = 9;
  const query = {};
  const options = {};  // { limit: pageSize };
  
  // following "if/else" block handles sorting of data coming back from DB via req.params.price and "options" obj passed into db.products.find()
  if (Object.hasOwn(req.query, 'price') && req.query.price === "lowest") {
    options.sort = { price: 1 };  
  } else if(Object.hasOwn(req.query, 'price') && req.query.price === "highest") {
    options.sort = { price: -1 };
  }
  // following "for in" loop handles searching for optional query param strings, skipping search result pages, and looking up products by category;
  for ( const key in req.query) {
    key === "query"? query["$text"] = { "$search": req.query[key], "$caseSensitive":  false } : null;
    // search for text param
    key === "page" ? options["skip"] = pageSize * (req.query[key] -1): null; //adds page prop to search object
    key === "category" ? query[key] = { $regex: new RegExp(req.query[key], "i") } : null; // adds category to search object
  }
  
  const queryLength = Product.find(query, {}, options).count();
  Product.find(query, {}, options).exec((err, products) => {
    if(err) { throw err; }
    res.json({products});
    })
  })
);

router.get("/products/:product", catchAsync(async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.product.trim());
  const product = await Product.findById(id);
  res.json(product);
 })
);

router.get("/products/:product/reviews", catchAsync(async(req, res) => {
  const id = req.params.product;
  let limit = 4;
  const page = req.query.page;
  const skips = limit * (page - 1);
  Product.findById(id).populate("reviews").exec((err, product) => {
    if(err) { throw err; }
    res.json(product.reviews.slice(skips, (skips + limit++)));
  });
}));

router.post("/products", catchAsync(async(req, res) => {
  const product = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    reviews: []
  })
  product.save();
  res.status(201).send("Product has been added.");
}));

router.post("/products/:product/reviews", catchAsync(async(req, res) => {
  const id = mongoose.Types.ObjectId(req.params.product.trim());
  const review = new Review({
    userName: req.body.name,
    text: req.body.text,
    rating: req.body.rating,
    product: id
  });
  
  Product.findById(id).exec((err, product) => {
    if(err) {throw err};
    product.reviews.push(review);
    product.save();
    review.save();
    res.status(201).send('Product has been reviewed');
    })
  })
)

router.delete("/products/:product", catchAsync(async(req, res) => {
  const id = mongoose.Types.ObjectId(req.params.product.trim());
  Product.findByIdAndDelete(id).exec((err, product) => {
    if(err) {throw err;}
    res.status(200).send('Product has been deleted');
  })
}))

router.delete("/reviews/:review", catchAsync(async(req, res) => {
  const id = mongoose.Types.ObjectId(req.params.review.trim());
  Review.findByIdAndDelete(id).exec((err, review) => {
    if(err) {throw err;}
    res.status(200).send('Review has been deleted');
  })
}))

router.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});


module.exports = router;
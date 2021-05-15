const router = require("express").Router();
const faker = require("faker");
const { Review, Product } = require ("../models/product");

router.param('product', function(req, res, next, id) {
  const query = Product.findOne({ _id: id });

  query.exec((err, product) => {
    if (err)
      return next(err);
    if (!product)
      return next(new Error("Can't find product."));
    
    req.product = product
    next();
  })
})

router.param('review', function(req, res, next, id) {
  const reviewQuery = Review.findOne({ _id: id });

  reviewQuery.exec((err, review) => {
    if (err)
      return next(err);
    if (!review)
      return next(new Error("Can't find review."));
    
    req.review = review
    next();
  })
})

router.get("/generate-fake-data", (req, res, next) => {
  for( let i = 0; i < 90; i++) {
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

  // return the first page by default
  const page = req.query.page || 1;
  const category = req.query.category || null;
  const price = req.query.price || null;
  const query = req.query.query || null;

  if (category !== null && price === 'highest' && query !== null) {
    Product.find({category: category, name: new RegExp(query, "i")})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort({price: 'desc'})
    .exec((err, products) => {  
      res.send(products);
    });
  } else if (category !== null && price === 'lowest' && query !== null) {
    Product.find({category: category, name: new RegExp(query, "i")})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort({price: 'asc'})
    .exec((err, products) => {  
      res.send(products);
    });
  } else if (price === 'lowest' && query !== null) {
    Product.find({name: new RegExp(query, "i")})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort({price: 'asc'})
    .exec((err, products) => {  
      res.send(products);
  });
 } else if (price === 'highest' && query !== null) {
  Product.find({name: new RegExp(query, "i")})
  .skip(perPage * page - perPage)
  .limit(perPage)
  .sort({price: 'desc'})
  .exec((err, products) => {  
    res.send(products);
}); 
} else if (price === 'lowest') {
    Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort({price: 'asc'})
    .exec((err, products) => {  
      res.send(products);
  });
  } else if (price === 'highest') {
    Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort({price: 'desc'})
    .exec((err, products) => {  
      res.send(products);
  });
  } else if (query !== null) {
    Product.find({name: new RegExp(query, "i")})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort({price: 'desc'})
    .exec((err, products) => {  
      res.send(products);
  });
 } else {
    Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {  
      res.send(products);
    });
  }
});
//Returns a specific product by its id
router.get("/products/:product", (req, res, next) => {
	res.send(req.product)
  next();
})

//returns products with reviews - extra
router.get("/reviews", (req, res, next) => {    
  Product.find({ reviews: {$exists:true, $not: {$size:0}}}).exec((err, reviews) => {
    res.send(reviews)
  })
})

//Returns ALL the reviews for a product, but limited to 4 at a time
router.get("/products/:product/reviews", (req, res, next) => {
  const reviewsPerPage = 4;
  const reviews = req.product.reviews;
  const page = req.query.page || 1;

  res.send(reviews)
})

//Creates a new product in the database
router.post("/products", (req, res, next) => {
  let newProduct = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    reviews: []
  })
  newProduct.save();
  res.send(newProduct);
  next();
})

//Creates a new review in the database by adding it to the correct product's reviews array.
router.post("/products/:product/reviews", (req, res, next) => {    
  let newReview = {
    userName: req.body.userName,
    text: req.body.text,
  }
  
  req.product.reviews.push(newReview);
  req.product.save();
  res.send(newReview);
})

//Deletes a product by id
router.delete("/products/:product", (req, res, next) => {    
  Product.deleteOne(req.product, function (err) {
    if (err) return next(err);

    res.send(`product deleted`);
  });
})


router.get("/products/:product/reviews/:review", (req, res, next) => {    
  res.send(req.review)
})

module.exports = router;
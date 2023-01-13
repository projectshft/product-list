const router = require("express").Router();
const faker = require("faker");
const {Product, Review} = require("../models/product");


router.get("/generate-fake-data", ( req, res, next ) => {
  for(let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image"
    product.reviews = [];

    let review = new Review();
    review.userName = faker.internet.userName();
    review.text = faker.lorem.text();
    review.product = [];

    product.reviews.push(review);
    review.product.push(product);

    review.save((err) => {
      if (err) throw err;
    });
    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});



///GET products?page=3 when requested...need 
//req._parsedUrl.page and parse int it to use for skip().limit()... 
//optional queries: categories, price, and page
router.get("/products", ( req, res, next ) => {
  const query = req.query.query ? req.query.query.charAt(0).toUpperCase()+req.query.query.slice(1).toLowerCase() : null;
  const _category = req.query.category ? req.query.category.charAt(0).toUpperCase() + req.query.category.slice(1).toLowerCase() : null;
  const price = req.query.price ? req.query.price.toLowerCase() : "lowest";
  const sortOrder = (_price = "lowest") => {
    return _price === "highest"? "desc"
          :_price === "lowest"? "asc"
          :null;
  }; 
  
  const pageNumber = req.query.page|| 1;
  const perPage = 9;
  const toThisProduct = perPage * pageNumber - perPage;
  //go back and figure out the $or operator is used to shorten this******************
  
  if(!_category){
    Product.find({$text:{$search: query, $caseSensitive: false}})
    .skip(toThisProduct)
    .limit(perPage)
    .sort({price: sortOrder(price)})
    .exec((err,products) => {
      res.send(products)
      res.end()
    }); 
  };

  Product.find({$text:{$search: query, $caseSensitive: false}, category: _category})
  .skip(toThisProduct)
  .limit(perPage)
  .sort({price: sortOrder(price)})
  .exec((err,products) => {
    res.send(products)
    res.end();
  });
});

// Returns a specific product by Id
router.get("/products/:product", ( req, res, next ) => {
  const productId = req.params.product;
  
  Product.find({_id: productId})
    .populate("reviews")
    .exec((err, p) =>{
      if(err) throw err;
      res.send(p[0]);
    });
});

// Returns ALL reviews for a product, but limited to 4 at a time. Retrieve out of products. Should pass in an optional page query parameter to paginate
router.get("/products/:product/reviews", ( req, res, next ) => {
  const productId = req.params.product;
  const pageNumber = req.query.page || 1;
  const perPage = 9;

  Product.find({_id: productId})
    .populate("reviews")
    .exec((err,p) => {
      if(err) throw err;
      res.send(p[0].reviews)
    })
})

//creates a new product in the database
router.post("/products/", ( req, res, next ) => {
  const newProduct = new Product ({
    category: faker.commerce.department(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: "https://via.placeholder.com/250?text=Product+Image",
    reviews: []
  })

  newProduct.save();
  res.end();
})

//Creates a new review in the database by adding it to the correct product's reviews array.
router.post("/products/:product/reviews", ( req, res, next ) => {
  const productId = req.params.product;
  let foundProduct = Product.find({_id: productId}).exec((err,data)=> {console.log(data)});
  
  let newReview = new Review({
    userName: "newComment",
    text: "newComment",
    product: []
  });

  Product.findOne({_id: productId}, (err,data)=> {
    console.log(data)
    newReview.product.push(data);
    newReview.save();
  });

  Product
    .updateOne({_id: productId}, {$push: {reviews: newReview}},(err, data) => {
      console.log(data);
      res.end();
    })
})

// Deletes a product by id
router.delete("/products/:product", ( req, res, next ) => {
  const productId = req.params.product;
  Product.findByIdAndDelete({_id: productId},(err, data) => {
    if(err) throw err;
    res.send(data);
  });
});

// Deletes a review by id
router.delete("/reviews/:review", ( req, res, next ) => {
  const reviewId = req.params.review;
  Review.findByIdAndDelete({_id: reviewId},(err, data) => {
    if(err) throw err;
    res.send(data);
  });
})

module.exports = router;
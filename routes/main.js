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
router.get("/products", async ( req, res, next ) => {
  //Always gives capitalized first letter
  const query = req.query.query ? req.query.query.charAt(0).toUpperCase()+req.query.query.slice(1).toLowerCase() : null; 
  const _category = req.query.category ? req.query.category.charAt(0).toUpperCase() + req.query.category.slice(1).toLowerCase() : null;
  const _priceSortFrom = req.query.price === "highest" ? "desc"
                :req.query.price === "lowest"  ? "asc"
                :req.query.price !== undefined ? req.query.price.toLowerCase():null; //lowecases all price inputs
  
  const querypageNumber = parseInt(req.query.page) || 1;
  const perPage = 9;
  const toThisProductNumber = perPage * querypageNumber - perPage;
  //const toThisPage = toThisProductNumber > count ? 1 : toThisProductNumber

  let count = await Product.countDocuments( 
    !query && !_category ? {}
    :!query?{category:_category} 
    :!_category? {$text:{$search: query, $caseSensitive: false}}
    :{$text:{$search: query, $caseSensitive:false}, category: _category}
  );

  let pagesTotal = (count % 9 == !0 ? Math.trunc((count / 9) + 1) : count > 0 && count < 9 ? 1 : count / 9) || 0; 

  let product = await Product.find(
    !query && !_category ? {}
    :!query?{category:_category} 
    :!_category? {$text:{$search: query, $caseSensitive: false}}
    :{$text:{$search: query, $caseSensitive:false}, category: _category}
  )
  //if product number greater than count then change skip to product 1.
  //loads a page if page number on frontend is querying at a high page number more than the products available.
  .skip(toThisProductNumber > count ? 1 : toThisProductNumber)
  .limit(perPage)
  .sort({price: _priceSortFrom})

  res.send({pages: pagesTotal, count: count, product: product});
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
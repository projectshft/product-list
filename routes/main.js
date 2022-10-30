const router = require("express").Router();
const { faker } = require('@faker-js/faker');
const product = require("../models/product");
const {Product} = require("../models/product");
const {Review} = require("../models/product");

//Generating fake data
router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();
  
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.reviews = []
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.save((err) => {
      if (err) throw err;
    });
    for (let x = 0; x < 8; x++) {
      let review=new Review()

      review.userName=faker.name.fullName(),
      review.text=faker.commerce.productDescription()
      review.product=product._id
      review.save((err) => {
        if (err) throw err;
      });
      product.rewievs.push(review)
  res.end();
}}})
//Middleware functions for 'review' and 'product' params
router.param('review', (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) next(err);
    req.review = review;
    next();
  });
});
router.param('product', (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) next(err);
    req.product = product;
    next();
  });
});

router.get("/categories",(req, res, next) => {
  Product.find({},'category')
  .sort({category:'asc'})
  .exec((err,cat)=>{
    if (err) return next(err);
    res.status(200)
    res.send(cat)
  })
})

router.get("/products", (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;
  const category=req.query.category || null;
  const price = req.query.price || null;
  const search = req.query.query || null;

  const getCategory =()=>{
    if (category){
     const categoryUpperCase=category[0].toUpperCase() + category.toLowerCase().slice(1);
     const categoryObject={'category':categoryUpperCase}
     return categoryObject
    }
    else {
      return {}
    }
  }
  const getQuery =()=>{
    if (search){
     const searchLowerCase=search.toLowerCase();
     const searchObject={$text: {$search: searchLowerCase}}
     return searchObject
    }
    else {
      return {}
    }
  }
  const unitingQueryParams=()=>{
    return unitedParams={
      ...getQuery(),...getCategory()
    }

  }
  const getSorting=()=>{
    if (price=='lowest'){
      return {price:1}
    }
    if (price=='highest'){
      return {price:-1}
    }
    else{
      return{}
    }
  }

  Product.find(unitingQueryParams())
    .sort(getSorting())
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if(count>0){
          if (err) return next(err);
          res.send(products); 
        }else{
          res.status(404);
          res.send('Error. No products within this query was found');
        }
      });
    });
});

router.get("/products/:product", (req, res, next) => {
  if (req.product) {
    res.status(200);
    res.send(req.product);
    }
  res.status(404);
  res.send('Error. Product with that id is not found');
})

router.get("/products/:product/reviews", (req, res, next) => {
  const perPage = 4;
  const page = req.query.page || 1;
  if (req.product){
  Review.find({product:req.params.product})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, reviews)=> {
      if (err) return next(err);
      res.status(200)
      res.send(reviews)
    });
  }
  else {
    res.status(404);
    res.send('Error. Product with that id is not found');
  }
})

router.post("/products", (req, res, next) => {
  if (req.body.category && req.body.price && req.body.name && req.body.image) {
    let product = new Product({
      category:req.body.category,
      price: req.body.price,
      name: req.body.name,
      image: req.body.image
    })
    product.save((err, data) => {
      if (err) next(err);
    });    
    res.status(200)
    res.send(`${product.name} was saved succesfully`)
  }
  res.status(400);
  res.send('Error. Image, category, price, and name must be provided.')
})

router.post("/products/:product/reviews", (req, res, next) => {
  if (req.product){
    if(req.body.text&req.body.username){
      let review=new Review({
        username:req.body.username,
        text: req.body.text,
        product: req.product._id
      })
      review.save((err, data) => {
        if (err) next(err);
      });
      req.product.reviews.push(review)
      product.save()
      res.send(`${review.username}'s review for ${req.product.name} was saved succesfully`)
    }
    res.status(400);
    res.send('Error. Text and Username must be provided.')
  }
  res.status(404);
  res.send('Error. Product with this id is not found');
  res.end();
})

router.delete("/products/:product", (req, res, next) => {
  if (req.product){
    Product.findByIdAndDelete(req.product._id)
    Review.deleteMany({ _id: { $in: req.product.reviews } })
    res.status(200);
    res.send(`${req.product.name} was deleted successfully`);
    }
  res.status(404);
  res.send('Error. Product with this id is not found');
})

router.delete("/reviews/:review", (req, res, next) => {
  if (req.review){
    Review.findByIdAndDelete(req.review._id)
    res.status(200);
    res.send(`${req.review.username}'s review was deleted successfully`);
    }
  res.status(404);
  res.send('Error. Review with this id is not found');
})



module.exports = router;
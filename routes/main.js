const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review")



//generates 90 random products in the products DB, no need to run again
router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    // product.save((err) => {
    //   if (err) throw err;
    // });
    product.save()
      .then((result) => {console.log('Result: ', result)})
      .catch((e) => {console.log(e)});
  }
  res.end();
});

//GET all products, with optional params like sorting or a specific page
router.get('/products', (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;
  console.log(req.query);
  
  Product.find({})
    .skip(perPage*page - perPage)
    .limit(perPage)
    .then((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      if (err) return next(err);
      Product.count()
      })
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {if (err) console.log(err)})
})

//GET specific product by its id
router.get('/products/:product', (req, res, next) => {
  const id = req.params.product
  
  Product.findById(id)
    .then((product) => {
      res.send(product);
      console.log('product found: ', product);     
      })
    .catch((err) => {
      res.json(err);
    })
})

//GET all reviews (limit to 4 at a time with pagination) for a 
//specific product by its id. Use model.findById() and paginate with optional 'page' 
//query param
router.get('/products/:product/reviews', (req, res, next) => {
  const id = req.params.product
  const perPage = 4;
  // return the first page by default
  const page = req.query.page || 1;

  Product.findById(id)
    .skip(perPage*page - perPage)
    .limit(perPage)
    .then((product) => {
      res.send(product.reviews);
      console.log(product.reviews);
    })
    .catch((err) => {
      res.json(err);
    })
})

//POST to create a new product
router.post('/products', (req, res, next) => {
  
  const prodDoc = new Product();
  prodDoc.category = req.body.category;
  prodDoc.name = req.body.name;
  prodDoc.price = req.body.price;
  prodDoc.image = req.body.image;

  prodDoc.save()
  .then((result) => {
    console.log('Result: ', result)
    res.json(prodDoc);
  })
  .catch((e) => {console.log(e)});
})

//POST to create a new review
router.post('/products/:product/reviews', (req, res, next) => {
  const id = req.params.product
  console.log('req.body', req.body);
  let prodId = Product.findById(id)
  .then((result) => {
    console.log('product query: ', result);

    let review = new Review({
      userName: req.body.userName,
      text: req.body.text,
      product: result._id
    });
    review.save();
    result.reviews.push(review);
    result.save();
    console.log('review saved: ', review);
    res.send(result);
    console.log('product query after adding review: ', result);
  })
  .catch((err) => {
    res.json(err)
  });
})

//DELETE a product by id
router.delete('/products/:product', (req, res, next) => {
  //product param is the product document's objectID
  const id = req.params.product
  
  Product.findByIdAndRemove(id)
    .then((result) => {
      res.send(result);
      console.log('product removed: ', result);
    })
    .catch((err) => {
      res.json(err);
    })
})

//DELETE a review by id
router.delete('/reviews/:review', (req, res, next) => {
  //review param is the review document's objectID
  const id = req.params.review
  
  Review.findByIdAndRemove(id)
    .then((result) => {
      res.send(result);
      console.log('review removed: ', result);      
    })
    .catch((err) => {
      res.json(err);
    })
})

module.exports = router;
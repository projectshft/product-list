const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const queryString = require('querystring')
const Review = require('../models/review')


router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();
    //sets up a random amount of reviews for every product
    let reviews = Math.floor(Math.random() * 10);

    let categoryData = faker.commerce.department();
    //this fixes issues with inconsistent white-spacing and casing in the department results of faker
    product.category = categoryData.trim().toLowerCase();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png';
    product.reviews = [];

    for (let i = 0; i < reviews; i++) {
      //populate the reviews section of products
      let review = new Review({
        userName :  faker.internet.userName(),
        text : faker.lorem.sentence(),
        product : product._id
      });
      review.save((err) => {
        if (err) throw err
      });
      product.reviews.push(review);
    }

    product.save((err) => {
      if (err) throw err
    })

  res.end('Success!')
  }
});

//GET all products with a limit of 40 per page
router.get('/products', (req, res, next) => {
  const perPage = 9

  // return the first page by default
  const page = req.query.page || 1
 //set up a query to represent the category property of the product
  let category = req.query.category;
  let price = req.query.price;
  let priceSort;

  if (price === 'highest') {
    priceSort = -1 
  } else {
    priceSort = 1
  };
  
  if (!category && !price) {
    Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Product.count().exec((err, count) => {
        if (err) return next(err)
        return res.send(products)
      })
    })
  }
  //filter products by their category
  if (category && !price) {
    category = category.toLowerCase();
    Product
    .find({ category: category})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err)
        return res.send(products)
      })
    })
  }
  //sort products by price
  if (price && !category) {
    Product.find({})
    .sort({ price : priceSort })
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
        Product.count().exec((err, count) => {
          if (err) return next(err)
          return res.send(products)
        })
    })
  }
  //sort by price and filtered by category
  if (price && category){
    category = category.toLowerCase();
    Product
    .find({ category: category})
    .sort({ price : priceSort })
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err)
        return res.send(products)
      })
    })
  }
})

//GET products by id
router.get('/products/:product', (req, res) => {
  Product.findById(req.params.product, (err, product) =>{
    res.send(product)
  })
})

//GET all reviews with a limit of 40 per page
router.get('/reviews', (req, res, next) => {
  //returns 40 review per page
  const perPage = 40

  // return the first page by default
  const page = req.query.page || 1

  Review
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Review.count().exec((err, count) => {
        if (err) return next(err)
        res.send(reviews)
      })
    })
})

//POST /products: Creates a new product in the database 
router.post('/products', (req, res) => {
  let newProduct = new Product(req.body);
  newProduct.save()
  res.send(`${newProduct.name} has been successfully added to the database`);
})
//POST /:product/review: Creates a new review in the database by adding it to the correct product's reviews array.
router.post('/products/:product/review', (req, res) => {
  //*****this will need addtional work*****
  //find product by id
  let { productId } = req.params.product;
  Product.findById(req.params.product, (err, product) => {   
    let newReview = new Review({
        userName :  req.body.userName,
        text : req.body.text,
        product : productId
    });
    // newReview.product === productId;
    newReview.save();
    let referenceId = newReview._id;
    Review.findOne({_id: referenceId});
    product.reviews.push(referenceId);
  })
  res.send(`Review has been successfully added to the product`);
})

//DELETE /products/:product: Deletes a product by id
router.delete('/products/:product', (req, res) => {
  //find the product by the id
  let productToRemoveId = req.params.product;
  Product.remove({_id: productToRemoveId}, (err, product) =>{
    if (err) throw err;
    res.send(`This product has been successfully removed from database`)
  })
})

//DELETE /reviews/:review : Deletes a review by id
router.delete('/reviews/:review', (req, res) => {
  let reviewToRemoveId = req.params.review;
  Review.remove({_id: reviewToRemoveId}, (err, review) =>{
    if (err) throw err;
    res.send(`This review has been successfully removed from database`)
  })
})

module.exports = router



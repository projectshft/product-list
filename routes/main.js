const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()


    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

   

// populate reviews with same template as products
    let review = new Review()

    review.userName = faker.internet.userName()
    review.text = faker.lorem.text()
    review.save();
    product.reviews.push(review);
    
    product.save((err) => {
      if (err) throw err
    })
  }

  res.end()
})

router.get('/products', (req, res, next) => {
    const perPage = 9
    const category = req.query.category
    var searchedCategory = {};
    if (category) {
      searchedCategory = {category: category}
    }
    var query  = category.where({ category: searchedCategory });
  query.findOne(function (err, category) {
  if (err) return handleError(err);
  if (category) {
    // doc may be null if no document matched
  }
});
    // return the first page by default
    const page = req.query.page || 1
  
    Product
      .find(searchedCategory)
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .populate('reviews', '-_id')
      .exec((err, products) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
        Product.count().exec((err, count) => {
          if (err) return next(err)
          
          res.send(products)
        })
      })



router.get('/reviews', (req, res, next) => {
  
    const page = req.query.page || 1
  
    Review
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, review) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
        Review.count().exec((err, count) => {
          if (err) return next(err)
  
          res.send(review);
        })
      })
  })

router.get('/products/:product', (req, res, next) => {
  
    const idforProduct = req.params.product;
  
    Product
      .find({_id : idforProduct})
      .limit(perPage)
      .exec((err, product) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
        Product.count().exec((err, count) => {
          if (err) return next(err)
  
          res.send(product)
        })
      })
    })
  })
  
router.post('/products', (req, res, next) => {
    
    const postProduct = req.body;
    if (!postProduct.category || !postProduct.name || !postProduct.price || !postProduct.image) {
      //error if the 4 required params are not entered in 
        res.writeHead(400, 'Please enter valid params');
        res.end();
    }
  //creating new instance of product
    let newProduct = new Product();
    newProduct.category =  postProduct.category;
    newProduct.name = postProduct.name;
    newProduct.price =  postProduct.price;
    newProduct.image =  postProduct.image;
    newProduct.reviews = [];


    newProduct.save((err) => {
        if (err) throw err
      })
    res.end();

})

router.post('/products/reviews', (req, res, next) => {
  const idforProduct = req.params.product

  const postReview = req.body;
  if (!postReview.username || !postProduct.text) {
    //error if the 2 required params are not entered in 
      res.writeHead(400, 'Please enter valid params');
      res.end();
  }
//creating new instance of review
  let newReview = new Review();
  newReview.username =  postReview.username;
  newReview.text = postReview.text;
  NewReview.save();


  Product.findById(idforProduct, (err, product) => {
    if (err) throw err;
    product.reviews.push(newReview);
    product.save(err => {
        if (err) throw err
        res.end();
    })
})
})

router.delete('/products', (req, res, next) => {
    
  newProduct.save((err) => {
      if (err) throw err
    })
      else {
        Product.remove;
      }
      

})


module.exports = router
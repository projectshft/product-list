//const router = require('express').Router()
var express = require('express');
var cors = require('cors');
var router = express.Router();
var app = express();
app.use(cors());
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
    
    product.save((err) => {
      if (err) throw err
    })
  }
  res.end("Success")
})

router.get('/products', cors(), (req, res, next) => {

    const perPage = 9;   
    req.query
    
    // return the first page by default
    const page = req.query.page || 1
    // query = Product.category  
    
    // let filterBycategory = {};
    // if (req.query.category == "Tools") {
    //     filterBycategory.category = "Tools";
    // }

    let sortOrder = {};
    if(req.query.price == "lowest"){
       sortOrder.price = 1;
    }
    if(req.query.price == "highest"){
        sortOrder.price = -1
    }
    console.log(sortOrder)

    let searchFilter = {};
    if(req.query.category) {
        searchFilter = {category: req.query.category};
    }
    
    Product
      .find(searchFilter)
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .sort(sortOrder)
      .exec((err, products) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
        Product.count(searchFilter).exec((err, count) => {
          if (err) {
            return next(err)
          } else {
            var totalPages = Math.ceil(count / perPage);
            var currentPage = parseFloat(page);
            
            res.json({
                "Page": currentPage,
                "Pages": totalPages,
                "Products": products
            })
          }
          //res.send(products)
        })
      })

  })

  router.get('/products/:product', (req, res, next) => {
    Product.findById(req.params.product, (err, product) =>{
        res.send(product)
    })
  })
  router.get('/reviews', (req, res, next) => {
      const perPage = 40

      const page = req.query.page || 1

      Review
        .find({}).populate('Review')
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, reviews) => {
            Review.countDocuments().exec((err, count) => {
                if(err) return next(err)
                res.send(reviews)
            })
        })
  })
  router.post('/products', (req, res, next) => {
    let product = req.body
    //This will add an item to the database

        let newProduct = new Product ({
            category: product.category,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            reviews: []
        })
        newProduct.save()
        res.send(product)
      
  })
  router.post('/:product/reviews', (req, res, next) => {
      let review = req.body;
      const id = req.params.product;
    //This will add a review to a product

        let newReview = new Review ({
            reviewText: review.reviewText,
            userName: review.userName,
            text: review.text,
        })
        newReview.save();
        Product.findById(id, (err, product) => {
            if (err) return next(err);
            product.reviews.push(newReview);
        res.send(product);

        })
  })

  router.delete('/products/:product', (req, res, next) => {
    Product.findByIdAndDelete(req.params.product, (err, product) =>{
        res.send(product)
    })
  })

   router.delete('/reviews/:review', (req, res, next) => {
    Review.findByIdAndDelete(req.params.review, (err, review) => {
        res.send(review)
       })
   })

module.exports = router
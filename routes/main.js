//const router = require('express').Router()
var express = require('express');
var cors = require('cors');
var router = express.Router();
var app = express();
app.use(cors());
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

//The Router below enables us to generate fake data that consists of 90 fake products.
router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    //The details of the fake products include their category, name, price and image as seen below. 
    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    
    //When there is an error, it will through back an error. 
    product.save((err) => {
      if (err) throw err
    })
  }
  res.end("Success")
})

//The Router below will allow us to view all Products in Postman. It uses cors to be able to connect to the front-end. 
router.get('/products', cors(), (req, res, next) => {
//The constant immediately below, sets each page to show only 9 products. With 90 products total, this will mean we will have ten pages when looking for the fake products. 
    const perPage = 9;   
    // return the first page by default
    const page = req.query.page || 1
   
    //creates a sort order to sort the prices from either lowest as the first if statement says, or highest as the second if statement says. 
    let sortOrder = {};
    if(req.query.price == "lowest"){
       sortOrder.price = 1;
    }
    if(req.query.price == "highest"){
        sortOrder.price = -1
    }
    console.log(sortOrder)

    //This enables us to filter by categories. The term searchFilter is used in the find method of Product to bring back the category filters to be used when we want to use the category filters.
    let searchFilter = {};
    if(req.query.category) {
        searchFilter = {category: req.query.category};
    }
    
    //This is where we not only find the category filter, but we filter the results to just one page
    Product
      .find(searchFilter)
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .sort(sortOrder)
      .exec((err, products) => {
        //We are using the count method to count the total number of fake products exist, which in this case is 90.
        Product.count(searchFilter).exec((err, count) => {
          if (err) {
            return next(err)
          } else {
            var totalPages = Math.ceil(count / perPage);
            var currentPage = parseFloat(page);         
            //This enables us to view which page number we are on, how many pages exist and what the products are on the page number we are on. 
            res.json({
                "Page": currentPage,
                "Pages": totalPages,
                "Products": products
            })
          }
        })
      })
  })

  //The Router below allows us to identify by Id a specific product.
  router.get('/products/:product', (req, res, next) => {
    Product.findById(req.params.product, (err, product) =>{
        res.send(product)
    })
  })
  //The Router below allows us to look at all the reviews that the Products have received.
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
  //The Router below will add an item to the database
  router.post('/products', (req, res, next) => {
    let product = req.body
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
  //The Router below will add reviews to a product.
  router.post('/:product/reviews', (req, res, next) => {
      let review = req.body;
      const id = req.params.product;
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

  //The Router below will delete a specific product within our product list. 
  router.delete('/products/:product', (req, res, next) => {
    Product.findByIdAndDelete(req.params.product, (err, product) =>{
        res.send(product)
       })
  })
   //The Router below will delete a specific review within our review list. 
   router.delete('/reviews/:review', (req, res, next) => {
    Review.findByIdAndDelete(req.params.review, (err, review) => {
        res.send(review)
       })
   })

module.exports = router
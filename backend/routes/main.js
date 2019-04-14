const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

router.get('/api/generate-fake-data', (request, response, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

    product.save((error) => {
      if (error) throw error
    })
  }
  response.end()
})

//get all products
router.get('/api/products', (request, response, next) => {
  Product
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((products) => {
        Product.count().exec((error) => {
          if (error) return next(error)
  
          response.send(products)
        })
      })
  })
 
  // get products 9 per page route
  router.get('/api/productspage', (request, response, next) => {
    const perPage = 9
  //page one is default
    const page = request.query.page || 1
    let sortPrice;   
    let category = request.query.category;
    let price = requset.query.price;
    
    if (price === 'highest') {
      sortPrice = -1 
    } else {
      sortPrice = 1
    };

    //return first 9 products
    //no sorting
  if (!category && !price) {
    Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .populate('reviews')
    .exec((products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Product.count().exec((error, count) => {
        if (error) return next(error)
        return response.send({products, count})
      })
    })
  }

  //sort products by price 
  if (price && !category) {
    Product.find({})
    .sort({ price : priceSort })
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .populate('reviews')
    .exec((products) => {
        Product.count().exec((error, count) => {
          if (error) return next(error)
          return response.send({products, count})
        })
    })
  }

  //sort products by category
  if (category && !price) {
    category = category.toLowerCase();
    Product
    .find({ category: category})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .populate('reviews')
    .exec((products) => {
      Product.count().exec((error, count) => {
        if (error) return next(err)
        return response.send({products, count})
      })
    })
  }


  //sort by price and category
  if (price && category){
    category = category.toLowerCase();
    Product
    .find({ category: category})
    .sort({ price : priceSort })
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .populate('reviews')
    .exec((products) => {
      Product.count().exec((error, count) => {
        if (error) return next(error)
        return response.send({products, count})
      })
    })
  }
})


//get products by id
router.get('/api/products/:product', (request, response) => {
    Product.findById(request.params.product)
    .populate('reviews')
    .exec((error, product) =>{
      if (error) throw error
      response.send(product)
    })
  })

  //GET all reviews with a limit of 40 per page
router.get('/api/reviews', (request, response, next) => {
    const perPage = 20
    const page = request.query.page || 1
  
    Review
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((reviews) => {
        Review.count().exec((error) => {
          if (error) return next(error)
          response.send(reviews)
        })
      })
  })

  //create new product 
router.post('/api/productspage', (request, response) => {
    let newProduct = new Product({
      category: request.body.category,
      name: request.body.name,
      price: request.body.price,
      image: request.body.image,
      reviews: []
    });
    newProduct.save()
    response.send(`${newProduct.name} has been added to the database`);
  })
  
  //create review and add to specific product
  router.post('/api/products/:product/review', (request, response) => {
    //find product by id
    let { productId } = request.params.product;
    Product.findById(request.params.product)
    .exec((product) => {   
      let newReview = new Review({
          userName:  request.body.userName,
          text: request.body.text,
          product: productId
      });

    newReview.save();
    let reviewId = newReview._id;
    Review.findOne({_id: reviewId});
    product.reviews.push(newReview);
    product.save();
  })
  response.send(`Review has been added to the product`);
})

//delete a specific product by the ID
router.delete('/api/products/:product', (request, response) => {
    let deleteProductId = request.params.product;
    Product.remove({_id: deleteProductId}, (error) =>{
      if (error) throw error;
      response.send(`The product has been removed from database`)
    })
  })

  //delete a specific review by ID
router.delete('/api/reviews/:review', (request, response) => {
    let deleteReviewId = request.params.review;
    Review.remove({_id: deleteReviewId}, (error) =>{
      if (error) throw error;
      response.send(`Review has been removed from database`)
    })
  })
module.exports = router
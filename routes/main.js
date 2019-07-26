const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')
let randomNumberBetweenOneandTen = Math.floor(Math.random()*(10-1+1)+1);

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()
    //add a random number of reviews to the review array on each product
    for (let i = 0; i < randomNumberBetweenOneandTen; i++) {
    let review = new Review()
    review.userName = faker.internet.userName();
    review.text = faker.lorem.sentence();
    review.save();
    product.reviews.push(review);
}
    //add content to each product property
    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

//MAYBE ADD WAY TO SHOW REVIEWS WHEN THIS RUNS
router.get('/products', (req, res, next) => {
    const perPage = 9
  //WHAT IF THEY DON"T PASS IN A CATEGORY
  //GIVE AN ERROR IF THE CATEGORY DOESN"T EXIST
    //test the price query to see whether the user wants ascending or descending prices
    let sortVariable;
    if(req.query.price == 'highest') {
        sortVariable = -1;
    } else if (req.query.price == 'lowest') {
        sortVariable = 1
    }

    const category = req.query.category
    // return the first page by default
    const page = req.query.page || 1
  
    Product
      .find({category: category})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .populate('reviews', '-_id')
      .sort({price: sortVariable})
      .exec((err, products) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
        Product.countDocuments().exec((err, count) => {
            if (err) return next(err)
  
          res.send(products)
        })
      })
  })
  
router.get('/product/:product', (req, res, next) => {
    // set requestedProduct to equal the parameter request
    const requestedProductId = req.params.product;
    //NOTE: maybe add check to see if requestedProduct is a number(id)

    //Find and send the product with the id which matches the requestedProductId
    Product
        .find({_id : requestedProductId})
        .exec((err,product) => {
            if (err) throw err;
            res.send(product);
        })
})

router.get('/reviews', (req,res,next) => {
    const perPage = 40;
    //allow optional query to allow pagination
    const page = req.query.page;

    Review
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, reviews) => {
            if (err) throw err;

            res.send(reviews);
        })


})

router.post('/products', (req, res, next) => {
    //NOTE: add check to see if each thing is the correct type i.e. string
    //NOTE: Check to see if it has all the necessary parts(and what ones are necessary)
    //NOTE: 
    const productToAdd = req.body;
    //add checks to make sure the categories exist

    //creating a new product model using information given by the user
    //NOTE: LOOK UP VALIDATORS YOU CAN USE THEM
    let newProduct = new Product();
    newProduct.category =  productToAdd.category;
    newProduct.name = productToAdd.name;
    newProduct.price =  productToAdd.price;
    newProduct.image =  product;
    newProduct.reviews = [];


    newProduct.save((err) => {
        if (err) throw err
      })
    res.end();

})

router.post('/:product/reviews', (req, res, next) => {
    //check to see if produc
    const productId = req.params.product
    //NOTE: maybe see if the product exists in the database?
    const reviewToAdd = req.body

    let newReview = new Review();
    newReview.userName =  reviewToAdd.userName;
    newReview.text= reviewToAdd.text;
    //save newReview to reviews collection
    newReview.save();

    Product.findById(productId, (err, product) => {
        if (err) throw err;
        //add the review to the reviews array
        product.reviews.push(newReview);
        //save the product
        product.save(err => {
            if (err) throw err
            else console.log(`Product ${productId} reviews succesfully updated`)
        })
    })
})

router.delete('/products/:product', (req, res , next) => {
    let productId = req.params.product;
    
    //delete the product that has an id which matches the productId variable
    Product.deleteOne({_id: productId }, err => {
        if (err) throw err;
        console.log(`Product ${productId} succesfully deleted`)
    })
})

router.delete('/reviews/:review', (req, res, next) => {
    let reviewId = req.params.review;

      //delete the product that has an id which matches the productId variable
      Review.deleteOne({_id: reviewId }, err => {

        if (err) console.log(err);
        console.log(`Review ${reviewId} succesfully deleted`)
    })
})
    

module.exports = router
//review
//5d3a093c64328810fcdd65ab

//5d3a095d1395a939404afc49
const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')


// router.get('/generate-fake-data', (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product
    
//         product.category = faker.commerce.department()
//         product.name = faker.commerce.productName()
//         product.price = faker.commerce.price()
//         product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
//         product.reviews= []


//     let review = new Review
    
//        review.userName= faker.name.findName()
//        review.text= faker.commerce.productAdjective()
//        review.product = product._id


//     review.save()
//     product.reviews.push(review)
//     product.save()
//     res.end()
// }
// })

//=============================================================
//Returns the first 9 products unless page is specified in query
//=============================================================
router.get('/products', (req, res, next) => {
    const perPage = 9
    // return the first page by default
    const page = req.query.page || 1
    let category
    //if category is specified it puts it in the find query
    if (req.query.category){
        category = {category:req.query.category}
    }
    //if pice highest or lowest is defined. it adds to sort function
    let price
    if (req.query.price=='highest'){
        price = {price: -1}
    }else if(req.query.price=='lowest'){
        price = {price: 1}
    }

    Product
      .find(category)
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .sort(price)
      .populate('reviews')
      .exec((err, products) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
        Product.count(category).exec((err, count) => {
          if (err) return next(err)
          res.send({products:products, count:count})
        })
      })
  })
//=============================================================
//returns one product by id number
//=============================================================
router.get('/products/:product', (req, res, next) => {

Product
    .findById(req.params.product)
    .exec((err, product) => {
        if (err) return next(err)
        res.send(product)
    })
})

//=============================================================
//returns the first 40 reviews 
//=============================================================
router.get('/reviews', (req, res, next) => {
    const perPage = 40
    // return the first page by default
    const page = req.query.page || 1
    Review
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, reviews) => {
            Review.count().exec((err, count) => {
                if (err) return next(err)
                res.send(reviews)
            })
        })
})
//=============================================================
//Post new product to the database
//=============================================================
router.post('/products', (req, res, next) => {
    let product = new Product()
    product.category = req.body.category
    product.name = req.body.name
    product.price = req.body.price
    product.image = req.body.image
    product.reviews = []
    product.save()
    res.send(product)
})

//=============================================================
//Adds a review to a product
//=============================================================
router.post('/:product/review', (req, res, next) => {
    Product
    .findById(req.params.product)
    .exec((err, product) => {
        if (err) return next(err)
        let review = new Review()
        review.userName = req.body.userName
        review.text = req.body.text
        review.product = req.params.product
        review.save()
        product.reviews.push(review)
        product.save()
        res.end()
    })
})

//=============================================================
 //deletes a product
 //=============================================================
router.delete('/products/:product', (req, res, next) => {
        Product
        .findById(req.params.product)
        .exec((err, product) => {
            if (err) return next(err)
            req.params.product.reviews.forEach(function(review){
                Review
                .findById(review._id) 
                .exec((err, product) => {
                    if (err) return next(err)

            })
        res.end()
        });
    });

})

//=============================================================
//Deletes the review
//=============================================================
router.delete('/reviews/:review', (req, res, next) => {
    //remove the review from product
    
    //filter the array
    //save the product
    
    
    Review
    .findByIdAndRemove(req.params.review)
    .exec((err, review) => {
        if (err) return next(err)
        res.end()
        })
    })



module.exports = router

const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review');
const { Mongoose } = require('mongoose');
const product = require('../models/product');

// router.get('/generate-fake-data', (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product()

//     product.category = faker.commerce.department()
//     product.name = faker.commerce.productName()
//     product.price = faker.commerce.price()
//     product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

//     product.save((err) => {
//       if (err) throw err
//     })
//   }
//   res.end()
// })

router.get('/products', (req, res, next) => {
    const perPage = 9
  
    // return the first page by default
    const page = req.query.page || 1

    // grab optional queries
    const category = req.query.category
    const price = req.query.price
    const search = req.body.search
  
    // Product
    //   .find({})
    //   .skip((perPage * page) - perPage)
    //   .limit(perPage)
    //   .exec((err, products) => {
    //     // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
    //     Product.count().exec((err, count) => {
    //       if (err) return next(err)
  
    //       res.send(products)
    //     })
    //   })
    let query = Product.find({})

    if (category) {
        query = query.find({category: category})
    }

    if (price) {
        if (price === 'highest') {
            query = query.sort({price: -1})
        } else {
            query = query.sort({price: 1})
        }

    }

    query
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, products) => {
            if (err) {
                throw err
            }
            Product.count().exec((err, products) => {
                if (err) {
                    throw err
                }     
            })
            res.json(products)
        })
});

router.get('/products/:product', (req, res, next) => {
    // grab :product from the params
    productID = req.params.product

    // find the product based off of the productID
    Product
        .findOne({_id: productID}, (err, product) => {
            if (err) {
                console.log(err)
            }
            res.json(product)
        })
});

router.get('/products/:product/reviews', (req, res, next) => {
    const perPage = 4
    // return the first page by default
    const page = req.query.page || 1
    // grab :product from the params
    productID = req.params.product
    // find the product based off of the productID
    Product
        .findOne({_id: productID})
            .populate({
                // add in pagination with limit and skip
                path:'reviews',
                options: {
                    limit: perPage,
                    skip: (perPage*page) - perPage}
                })
            .exec((err, product) => {
                res.json(product.reviews)
            })
    
});

router.post('/products', (req, res, next) => {
    // create new product
    let newProduct = new Product()
    // fill out product's key object pairs from the request body
    newProduct.category = req.body.category
    newProduct.name = req.body.name
    newProduct.price = req.body.price
    newProduct.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    // save new product and console log any errors that occur
    newProduct.save((err, product) => {
        if (err) {
            console.log(err)
        }
        res.json('product saved')
    })
});

router.post('/products/:product/reviews', (req, res, next) => {
    // create new review
    let newReview = new Review;
    // fill out reviews's key object pairs from the request body
    newReview.userName = req.body.userName
    newReview.text = req.body.text
    // assign product based on params
    newReview.product = req.params.product
    // find product and add new review to its reviews array
    Product
        .findOne({_id: req.params.product}, (err, product) => {
            if (err) {
                throw err
            }
            product.reviews.push(newReview._id)
            product.save()
        })
    // save new review and error as needed
    newReview.save((err, review) => {
        if (err) {
            console.log(err)
        }
        res.json('review saved')
    })
});

router.delete('/products/:product', (req, res, next) => {
    // grab :product from the params
    productID = req.params.product
    // delete product 
    Product.deleteOne({_id: productID}, (err) => {
        if (err) {
            throw err
        }
        // then delete all reviews referencing that product
        Review.deleteMany({product: productID}, err => {
            if (err) {
                throw err
            }
            res.json('product deleted')
        }) 
    })
});

router.delete('/reviews/:review', (req, res, next) => {
    // grab :product from the params
    reviewID = req.params.review
    // find prouduct referencing reviewID
    Product.findOne({reviews: reviewID}, (err, product) => {
        if (err) {
            throw err
        }
        // remove reviewID from array
        product.reviews.splice(product.reviews[reviewID], 1)
        product.save()
        // find and delete review itself
        Review.deleteOne({_id: reviewID}, (err, review)=> {
            if (err) {
                throw err
            }
            res.json('review deleted')
        })
    })
});


module.exports = router
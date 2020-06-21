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
//     product.image = 'https://i1.wp.com/pakfactory.com/blog/wp-content/uploads/2018/11/BLNCD-3.jpg?resize=1024%2C1024&ssl=1'

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
    let category = req.query.category
    const price = req.query.price
    const search = req.query.query
  
    let query = Product.find({})

    if (search) {
        // use text index to search full product
        query = query.find({$text: {$search: search}})
    }

    // build up the query, first check if category is present and search by it
    if (category) {
        // make sure first letter is capitalized and all others are lowercase
        category = category.toLowerCase()
        category = category[0].toUpperCase() + category.slice(1)
        // only return those products that have a matching category
        query = query.find({category: category})
    }
    // sort by price whether the query is highest or lowest
    if (price) {
        if (price === 'lowest') {
            query = query.sort({price: 1})
        } else if (price === 'highest') {
            query = query.sort({price: -1})
        } else {
            // if query entered incorrectly, say so
            res.status(400).send('price query must either be set to highest or lowest.')
        }
    }

    query
        // skip for as many pages as you're on - 1 page's worth of products
        .skip((perPage * page) - perPage)
        // limit responses per page
        .limit(perPage)
        // execute the query
        .exec((err, products) => {
            if (err) {
                throw err
            }
            Product.count().exec((err, products) => {
                if (err) {
                    throw err
                }     
            })
            if (products.length === 0) {
                // return something if the array will be empty
                res.json('No results for that search. Try simplifying your search to one word or changing the category query.')
            } else {
                res.json(products)
            } 
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
                res.status(400).json('that product ID is invalid.')
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
                if (err) {
                    res.status(400).json('that product ID is invalid.')
                }
                res.json(product.reviews)
            })
    
});

router.post('/products', (req, res, next) => {
    // create new product
    let newProduct = new Product()
    // fill out product's key object pairs from the request body
    if (req.body.category && req.body.name && req.body.price && req.body.image) {
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
    } else {
        res.status(400).json('Missing some of the fields. Please make sure all fields are filled out.')
    }
});

router.post('/products/:product/reviews', (req, res, next) => {
    // create new review
    let newReview = new Review;
    // fill out reviews's key object pairs from the request body
    newReview.userName = req.body.userName
    newReview.text = req.body.text
    // assign product based on params
    newReview.product = req.params.product
    // make sure all fields are present
    if (newReview.userName && newReview.text) {
        // find product and add new review to its reviews array
        Product
        .findOne({_id: req.params.product})
        .exec((err, product) => {
            if (err) {
            res.status(400).json('that product ID is invalid.')
        }
        product.reviews.push(newReview._id)
        product.save()
    })
            
    // save new review and error as needed
    newReview.save((err, review) => {
        if (err) {
            console.log(err)
            res.status(500).json('Something went wrong. Please try again later.')
        }
        res.json('review saved')
    })
    } else {
        // if not all fields filled out, say so
        res.status(400).json('Missing some of the fields. Please make sure all fields are filled out.')
    }
});

router.delete('/products/:product', (req, res, next) => {
    // grab :product from the params
    productID = req.params.product
    // delete product 
    Product.deleteOne({_id: productID}, (err) => {
        if (err) {
            console.log(err)
            res.status(400).json('invalid product ID')
        }
        // then delete all reviews referencing that product
        Review.deleteMany({product: productID}, err => {
            if (err) {
                console.log(err)
                res.status(500).json('Something went wrong. Please try again later.')
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
            console.log(err)
            res.status(400).json('invalid review ID.')
        }
        // remove reviewID from array
        product.reviews.splice(product.reviews[reviewID], 1)
        product.save()
        // find and delete review itself
        Review.deleteOne({_id: reviewID}, (err, review)=> {
            if (err) {
                console.log(err)
                res.status(500).json('Something went wrong. Please try again later.')
            }
            res.json('review deleted')
        })
    })
});


module.exports = router
const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/products')
const Review = require('../models/reviews')


router.get('/products', (req, res, next) => {

    //Limits the page to have 9 products at a time 
    const perPage = 9;
    let queryCategory = req.query.category;


    const highestPrice = { price: 'desc', highest: -1 };
    const lowestPrice = { price: 'asc', lowest: 1 };
    let price;


    //This function is used to change the first letter of the query to a capital letter in order to work with our database 
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    // return the first page by default
    const page = req.query.page || 1

    if (req.query.category == "" || req.query.category == null || req.query.category.length == 0 || !req.query.category) {
        queryCategory = {};
    } else {
        queryCategory = { category: capitalize(queryCategory) }
    }

    if (req.query.price == "highest") {
        price = highestPrice
    }
    if (req.query.price == "lowest") {
        price = lowestPrice
    }



    Product
        .find(queryCategory)
        .sort(price)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, products) => {
            // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back

            Product
                .count(queryCategory)
                .exec((err, count) => {
                    var pages = count / perPage;
                    if (err) return next(err)
                    res.send({ products: products, count: count, pages: Math.ceil(pages) })
                })
        })

});

//This route gives the specfic product by ID 
router.get('/products/:product', (req, res, next) => {
    Product
        .findById(req.params.product)
        .exec((error, product) => {
            res.send(product)
        })

});

//This route brings back 40 reviews per page 
router.get('/reviews', (req, res, next) => {
    const perPage = 40;

    // return the first page by default
    let page = req.query.page || 1;

    //this returns an error message if the page number is less than 1 
    if (page < 1) {
        res.status(400).send('Invalid query')
    }
    Review
        .find({})
        .limit(perPage)
        .skip((perPage * page) - perPage)
        .exec((error, reviews) => {
            res.send(reviews)
        })

});

//This route allows you to delete a product by particular ID 
router.delete('/products/:product', (req, res, next) => {
    Product
        .findByIdAndDelete(req.params.product)
        .exec((error, product) => {
            res.end("Product Deleted")
        })
});

//This route allows you to delete a review by particular ID 
router.delete('/reviews/:review', (req, res, next) => {
    Review
        .findByIdAndDelete(req.params.review)
        .exec((error, product) => {
            res.end("Review deleted")
        })

});

//This route allows the client to add a new product to the database
router.post('/products', (req, res, next) => {
    let product = new Product()

    product.category = req.body.category
    product.name = req.body.name
    product.price = req.body.price
    product.image = req.body.imageURL
    product.reviews = []

    product.save((err) => {
        if (err) throw err
        res.end('Your product was saved');
    })
});

//This route allows the client to add a new review to a product by ID 
router.post('/:product/reviews', (req, res, next) => {

    Product
        .findById(req.params.product)
        .exec((error, product) => {
            let review = new Review()

            review.username = req.body.username
            review.text = req.body.text
            review.product = product._id

            product.save((err) => {
                if (err) throw err
                res.end();
            })
            review.save((err) => {
                if (err) throw err
                res.send(product);
            })

            product.reviews.push(review)

        })

});

//This route passes in new fake products and reviews into our databases
router.get('/generate-fake-data', (req, res, next) => {
    for (let i = 0; i < 90; i++) {
        let product = new Product()

        product.category = faker.commerce.department()
        product.name = faker.commerce.productName()
        product.price = faker.commerce.price()
        product.image = 'https://hips.hearstapps.com/cosmouk.cdnds.net/15/21/1600x800/landscape_nrm_1432138418-o-poop-emoji-ice-cream-facebook.jpg?resize=480:*'

        product.save((err) => {
            if (err) throw err
        })

        let review = new Review()

        review.username = faker.internet.userName()
        review.text = faker.lorem.sentences()
        review.product = product._id


        review.save((err) => {
            if (err) throw err
        })
        product.reviews.push(review)


    }
    res.end()
})



module.exports = router
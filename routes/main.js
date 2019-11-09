const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/products')
const Review = require('../models/reviews')


router.get('/products', (req, res, next) => {
    //Limits the page to have 9 products at a time 
    const perPage = 9;

    // return the first page by default
    const page = req.query.page || 1

    Product
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, products) => {
            // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
            Product.count().exec((err, count) => {
                if (err) return next(err)
                res.send({ products: products, count: count })
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

router.delete('/products/:product', (req, res, next) => {
    Product
        .findByIdAndDelete(req.params.product)
        .exec((error, product) => {
            res.end("Deleted")
        })
});

router.delete('/reviews/:review', (req, res, next) => {
    Review
        .findByIdAndDelete(req.params.review)
        .exec((error, product) => {
            res.end("Deleted")
        })

});

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
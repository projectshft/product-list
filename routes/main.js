const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/products')
const Review = require('../models/reviews')


router.get('/products', (req, res, next) => {
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
                res.send(products)
            })
        })
});

router.get('/products/:product', (req, res, next) => {

    Product
        .findById(req.params.product)
        .exec((error, product) => {
            res.send(product)
        })

});
router.get('/reviews', (req, res, next) => {

    Product
        .findById(req.params.product)
        .exec((error, product) => {
            res.send(product)
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
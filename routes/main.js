const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')

router.get('/generate-fake-data', async (req, res, next) => {
    try {
        for (let i = 0; i < 90; i++) {
            const product = new Product({
                category: faker.commerce.department(),
                name: faker.commerce.productName(),
                price: faker.commerce.price(),
                image: 'https://via.placeholder.com/250?text=Product+Image',
            })

            await product.save()
        }
        res.end()
    } catch (error) {
        next(error)
    }
})

router.get('/products', (req, res, next) => {
    const perPage = 9

    // return the first page by default
    const page = req.query.page || 1

    Product.find({})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec((err, products) => {
            // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
            Product.count().exec((err, count) => {
                if (err) return next(err)

                res.send(products)
            })
        })
})

module.exports = router

const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')

router.get('/generate-fake-data', (req, res, next) => {
    for (let i=0; i < 90, i++) {
        let product = new Product()

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

module.exports = router 
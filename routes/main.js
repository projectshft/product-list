const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
// const Review = require('../models/review')

router.get('/generate-fake-data', (req, res, next) => {
    for (let i = 0; i < 90; i++) {
        let product = new Product();
        //let review = new Review ();

        product.category = faker.commerce.department()
        product.name = faker.commerce.productName()
        product.price = faker.commerce.price()
        product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
        //product.reviews = [review]?

        product.save((err) => {
            if (err) throw err
        })
    }
    res.end()
})

Product.find({})
  .populate('reviews')
  .exec((err, review) => {
    if (err) {
      console.error(err);
    } else {
      console.log(review);
    }
  });

router.get('/products', (req, res, next) => {
    const perPage = 9

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
})

module.exports = router
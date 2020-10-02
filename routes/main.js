const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

router.get('/generate-fake-data', (req, res, next) => {
    let product;

    let genReviews = () => {
        for (let i = 0; i < 10; i++) {
            let review = new Review()
            
            review.userName = faker.commerce.productName()
            review.text = faker.lorem.paragraph()
            review.product = product._id
            review.save((err) => {
                if(err) throw err
            })
            product.reviews.push(review);
        }
    }
    
    for (let i = 0; i < 90; i++) {
        product = new Product()

        product.category = faker.commerce.department()
        product.name = faker.commerce.productName()
        product.price = faker.commerce.price()
        product.image = 'https://via.placeholder.com/250?text=Product+Image'
        genReviews()

        product.save((err) => {
            if (err) throw err
        })
    }
    res.end()
})

router.get('/products', (req, res, next) => {
    let page = req.query.page || 1
    
    Product.find().skip((page -1)*10).limit(10).sort({name: 1}).exec((err, products) => {
        Product.count().exec((err, count) => {
            if(err) return next(err)
            // console.log(count)
            res.send(products)
        })
    })
})

router.get('/products/:product', (req, res) => {
    let {product} = req.params
    // console.log(product)

    Product.find({_id: product}).exec((err, product) => {
        if(err) throw(err)
        res.send(product)
    })
})

router.get('/products/:product/reviews', (req, res, next) => {
    let {product} = req.params
    let page = req.query.page || 1
    //console.log(product)

    Product.find({_id: product}).exec((err, prod) => {
        let reviews = prod[0].reviews
        
        const getReviews = () => {
            let reviewsToReturn = [];
            for( let i = 0; i < reviews.length; i++) {
                Review.find({_id: reviews[i]}).exec((err, review) => {
                    if(err) return next(err)
                    reviewsToReturn.push(review)
                    
                    // console.log(reviewsToReturn)
                })
            }
            res.send(reviewsToReturn)
        }
        getReviews()
    })
})

router.post('/products', (req, res) => {
    console.log(req.body)

    let newProduct = new Product({
        category: req.body.category,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
    })

    // newProduct.save((err) => {
    //     if (err) throw err
    // })
    res.end()
})
module.exports = router
const router = require('express').Router()
//const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')
const ObjectId = require('mongoose').Types.ObjectId


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
    // return the first page by default
    const perPage = 9
    const page = req.query.page || 1

    //if category and search is specified it looks for products with both
    let toFind
    if (req.query.category && req.query.search) {
        toFind = { $and: [{ category: req.query.category }, { $text: { $search: req.query.search } }] }
    //if just category is specified looks for just that
    } else if (req.query.category && !req.query.search) {
        toFind = { category: req.query.category }
    }
    //if search is specified it puts it in the find query
    else if (!req.query.category && req.query.search) {
        toFind = { $text: { $search: req.query.search } }
    }
    //if price highest or lowest is defined. it adds to sort function
    let price
    if (req.query.price == 'highest') {
        price = { price: -1 }
    } else if (req.query.price == 'lowest') {
        price = { price: 1 }
    }

    //finding products with the search and category parameters, specific page, and sorted if requested
    Product
        .find(toFind)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .sort(price)
        .populate('reviews')
        .exec((err, products) => {
            // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
            Product.count(toFind).exec((err, count) => {
                if (err) return next(err)
                //send back products and the count
                res.send({ products: products, count: count })
            })
        })
})
//=============================================================
//returns one product by id number
//=============================================================
router.get('/products/:product', (req, res, next) => {
    //if product id number does not exist
    if (!req.params.product || !ObjectId.isValid(req.params.product)) {
        res.status(400);
        res.send("Missing or invalid id parameter in URL");
        return res.end();
    }
    //searches for product based on id # requested
    Product
        .findById(req.params.product)
        .exec((err, product) => {
            if (err) return next(err)
            if (product) {
                res.send(product)
            } else {
                res.status(404);
                return res.end(`product with id ${req.params.product} not found`);
            }
        })
})

//=============================================================
//returns the first 40 reviews 
//=============================================================
router.get('/reviews', (req, res, next) => {
    const perPage = 40
    // return the first page by default
    const page = req.query.page || 1
    //searches for all review but limits to 40
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
    //check if body  is valid
    if (!req.body.name ||!req.body.category ||!req.body.price ||!req.body.image||typeof req.body !== 'object' ) {
        res.status(401);
        res.send("Products must contain name, category, price, and image URL");
        return res.end();
    }
    //check price is a number above 0
    if (isNaN(req.body.price) || req.body.price <= 0){
        res.status(401);
        res.send("Price must be a number above 0");
        return res.end(); 
    }
    //creating a new product 
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
    //if product id number does not exist
    if (!req.params.product || !ObjectId.isValid(req.params.product)) {
        res.status(400);
        res.send("Missing or invalid id parameter in URL");
        return res.end();
    }
    //check if body  is valid
    if (!req.body.userName ||!req.body.text || typeof req.body !== 'object' ) {
        res.status(401);
        res.send("Reviews must contain userName and text");
        return res.end();
    }
    Product
        .findById(req.params.product)
        .exec((err, product) => {
            if (err) return next(err)
            if (product) {
                let review = new Review()
                review.userName = req.body.userName
                review.text = req.body.text
                review.product = req.params.product
                review.save()
                product.reviews.push(review)
                product.save()
                res.end()
            } else {
                res.status(404);
                return res.end(`product with id ${req.params.product} not found`);
            }
        })
})

//=============================================================
//deletes a product
//=============================================================
router.delete('/products/:product', (req, res, next) => {
    //if product id number does not exist
    if (!req.params.product || !ObjectId.isValid(req.params.product)) {
        res.status(400);
        res.send("Missing or invalid id parameter in URL");
        return res.end();
    }
    Product
        .findByIdAndRemove(req.params.product)
        .exec((err, product) => {
            if (err) return next(err)
            if (product) {
                Review.deleteMany({ product: req.params.product })
                    .exec((err, product) => {
                        if (err) return next(err);
                        res.end()
                    })
            } else {
                res.status(404);
                return res.end(`product with id ${req.params.product} not found`);
            }
        });
});


//=============================================================
//Deletes the review
//=============================================================
router.delete('/reviews/:review', (req, res, next) => {
    //if review id number does not exist
    if (!req.params.review || !ObjectId.isValid(req.params.review)) {
        res.status(400);
        res.send("Missing or invalid id parameter in URL");
        return res.end();
    }
    //find review by id and delete
    Review
        .findById(req.params.review)
        .exec((err, review) => {
            if (err) return next(err)
            if (review) {
                review.remove()
                 //update the product without that review
                Product
                    .update({ _id: review.product },{ '$pull': { 'reviews': review._id } })
                    .exec((err, product) => {
                        if (err) return next(err)
                        res.end()
                    })
            } else {
                res.status(404);
                return res.end(`product with id ${req.params.review} not found`);
            }
        })
})



module.exports = router

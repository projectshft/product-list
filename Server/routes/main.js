const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

router.get('/generate-fake-data', (req, res, next) => {
    for (let i = 0; i < 90; i++) {
        let product = new Product();
        let review = new Review({
            text: faker.commerce.productAdjective(),
            userName: faker.name.findName(),
            product: product._id
        })

        // })
        // review.save((err)=> {
        //     if (err) throw err
        // })
        review.save()
        product.category = faker.commerce.department()
        product.name = faker.commerce.productName()
        product.price = faker.commerce.price()
        product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

        product.save((err) => {
            if (err) throw err
        })

        product.reviews.push(review)
    }
    res.end()
})


router.get('/products', (req, res, next) => {


    const perPage = 9
    // return the first page by default
    const page = req.query.page || 1

    let queryFilter = {};
    //if category is specified it puts it in the query
    if (req.query.category ) {
        queryFilter.category = req.query.category
    }
    //if search is specificied it puts it in the query 
    if (req.query.search) {
        queryFilter = { $text: { $search: req.query.search } }
    }
    //if category and search
    if (req.query.search && req.query.category) {
        queryFilter =  {$text: { $search: req.query.search } }
        queryFilter.category = req.query.category
        
    }

    //if pice highest or lowest is defined. it adds to sort function
    let sort
    if (req.query.price == 'highest') {
        sort = {price: -1}
    } else if (req.query.price == 'lowest') {
        sort = {
            price: 1
        }
    }
    //variable query = reusable for actual search for the products and the total number of count
    //here's what the object looks like and see the object as the parameter 
    //if you add new key to the object 
    Product
        .find(queryFilter)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .sort(sort)
        .exec((err, products) => {
         if (err) return next(err)
            Product.count(queryFilter).exec((err, count) => {
                 if (err) return next(err) 
                    res.send({
                       products: products, 
                       count: count
                                })
                            })
                        })
    
                    })
    

        //if products.length === 0 || count ===0 
        //return an error 

// GET /products/:product: Returns a specific product by its id
router.get('/products/:productId', (req, res, next) => {

    //find the sinigular product by Params product Id
    Product.findOne({
        //why does this work and not in the post one??? ask Sean
        //TODO: 
        _id: req.params.productId
    }).exec((err, product) => {
        if (err) {
            res.send(err)
        } else {
            res.send(product)
        }
    })


});

// GET /reviews: Returns ALL the reviews, but limited to 40 at a time. 
//This one will be a little tricky as you'll have to retrieve them out of the products. 
//You should be able to pass in an options page query to paginate.
//create a review and save it and add it to the product reviews and update the product 
router.get('/reviews', (req, res, next) => {
    //receive the product Id and the information about the review  from the request 
    //where do i populate ? this is the wrong place
    Product.find({})
        .populate('reviews')
        .exec((err, reviews) => {
            if (err) {
                console.error(err);
            } else {
                // console.log(reviews);
            }
        });

    const perPage = 9

    // return the first page by default
    const page = req.query.page || 1

    Review
        .find({})
        .skip((perPage * page) - perPage)
        //limit 40 reviews per page
        .limit(40)
        .exec((err, reviews) => {
            // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
            Review.count().exec((err, count) => {
                if (err) return next(err)

                res.send(reviews)
            })
        })

});

// POST /products: Creates a new product in the database
router.post('/products', (req, res, next) => {

    let newProduct = new Product()
    let newReview = new Review({
        text: faker.commerce.productAdjective(),
        userName: faker.name.findName(),
        product: newProduct._id
    })
    newProduct.category = req.body.category
    newProduct.name = req.body.name
    newProduct.price = req.body.price
    newProduct.image = req.body.image

    newProduct.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })

    newProduct.reviews.push(newReview)
})

// POST /:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.
router.post('/:product/reviews', (req, res, next) => {

    //find the sinigular product by Params product Id
    Product.findOne({
        "_id": req.params.product
    }).exec((err, product) => {
        if (err)
            res.send(err)
        //create new product 
        let productReview = new Review()
        productReview.text = req.body.text
        productReview.userName = req.body.userName
        productReview.product = req.params.product
        //save the new product
        productReview.save()
        //push the new review into the products 
        product.reviews.push(productReview)
        product.save()
        res.send(product)

    })
})
// DELETE /products/:product: Deletes a product by id
router.delete('/products/:product', (req, res, next) => {
    Product
        .findByIdAndRemove(req.params.product)
        .exec((err, product) => {
            if (err) return next(err)
            res.end()
        })
})

// DELETE /reviews/:review: Deletes a review by id
router.delete('/reviews/:review', (req, res, next) => {
    //1) remove the review from the product 
    //filtering an array 
    //2 )save the product 

    //3)
    Review
        .findByIdAndRemove(req.params.review)
        .exec((err, product) => {
            if (err) return next(err)
            res.end()
        })

})

module.exports = router
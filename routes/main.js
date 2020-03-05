const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review') // ReviewSchema

router.get('/generate-fake-data', (req, res, next) => {
    for (let i = 0; i < 90; i++) {
        let product = new Product()
        let review = new Review()

        product.category = faker.commerce.department()
        product.name = faker.commerce.productName()
        product.price = faker.commerce.price()
        product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
        product.reviews = [review]
        product.save((err) => {
            if (err) throw err
        })
    }
    res.end()
})
//******************************************************************************************************/
// GET product/ get ALL products 9 at the time
//******************************************************************************************************/
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
//******************************************************************************************************/
// GET product/ byt its ID parameter
//******************************************************************************************************/
router.get('/products/:product', (req, res, next) => {
    Product
        .findById(req.params.product)
        .exec((err, products) => {
            res.send(products)
        })
});
//******************************************************************************************************/
// GET REVIEWS/  returns all reviews displaying 40 at the time
//******************************************************************************************************
router.get('/reviews', (request, response) => {
    const perPage = 40;
    // Return the first page by default (mimics GET /products)
    let page = request.query.page || 1;
    Product.find({})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec((error, products) => {
            Product.count().exec((error, count) => {
                if (error) throw error;

                const reviewsAll = [];
                for (i in products) {
                    reviewsAll.push(products[i].reviews)
                }
                response.send(reviewsAll);
            });
        });
});
//******************************************************************************************************/
// POST PRODUCT/  create new product in database
//******************************************************************************************************
router.post('/products', (request, response) => {
    const newProduct = new Product()
    newProduct.category = request.body.category
    newProduct.name = request.body.name
    newProduct.price = request.body.price
    newProduct.image = request.body.image
    newProduct.reviews = []

    newProduct.save(error => {
        if (error) throw error;
        response.send(newProduct);
    });
});
// not sure if you want user entering data or you want to have them generated. Below is commented code to auto-generate
// router.post('/products', (request, response) => {
//     const newProduct = new Product({
//       category: faker.commerce.department(),
//       name: faker.commerce.productName(),
//       price: faker.commerce.price(),
//       image: 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png',
//       reviews: []
//     });
//     newProduct.save(error => {
//       if (error) throw error;
//       response.send(newProduct);
//     });
//   });

//******************************************************************************************************/
// POST PRODUCT/  create new product in database
//******************************************************************************************************
router.post('/:product/review', (request, response) => {
    //find product by id
    let productId = request.params.product;
    Product.findById(productId)
        // .populate('reviews')
        .exec((error, product) => {
            let newReview = new Review({
                userName: request.body.userName,
                text: request.body.text,
                product: productId
            });

            newReview.save();
            let reviewId = newReview._id;
            Review.findOne({
                _id: reviewId
            });
            product.reviews.push(newReview);
            product.save();
        })
    response.send(`Review has been added `);
})


module.exports = router
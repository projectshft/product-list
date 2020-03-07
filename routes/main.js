const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review') // ReviewSchema

router.get('/generate-fake-data', (request, response, next) => {
    for (let i = 0; i < 90; i++) {
        let product = new Product()
        let review = new Review()

        product.category = faker.commerce.department()
        product.name = faker.commerce.productName()
        product.price = faker.commerce.price()
        product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
        product.reviews = []

        review.userName = faker.name.firstName();
        review.text = faker.lorem.sentence();
        review.product = product._id

        review.save();
        product.reviews.push(review);

        product.save((err) => {
            if (err) throw err
        })
    }
    response.end()
})
//******************************************************************************************************/
// GET product/ get ALL products 9 at the time
//******************************************************************************************************/
router.get('/products', (request, response, next) => {
    const perPage = 9
    const page = request.query.page || 1;

    let findCategory = {};
    if (request.query.category) {
        findCategory = {
            ...findCategory,
            category: request.query.category
        };
    }

    const priceSort = {};
    if (request.query.price === 'highest') {
        priceSort.price = 'descending';
    } else if (request.query.price === 'lowest') {
        priceSort.price = 'ascending';
    }

    Product.find(findCategory) 
        .sort(priceSort)
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec((error, products) => {
            Product.count(findCategory, (error, count) => {
                if (error) throw error;
                // Calculate total number of pages
                let pages = Math.ceil(count / perPage);
                response.send({
                    pages,
                    products
                });
            });
        });
});

//******************************************************************************************************/
// GET product/ byt its ID parameter
//******************************************************************************************************/
router.get('/products/:product', (request, response, next) => {
    Product
        .findById(request.params.product)
        .exec((err, products) => {
            response.send(products)
        })
});
//******************************************************************************************************/
// GET REVIEWS/  returns all reviews displaying 40 at the time
//******************************************************************************************************
router.get('/reviews', (request, response) => {
    const perPage = 40;
    // Return the first page 
    let page = request.query.page || 1;
    Review.find({})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec((error, reviews) => {
            Review.estimatedDocumentCount().exec((err, count) => {
                if (err) return next(err);

                response.send(reviews);
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
//************************************************************************************************/
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
router.post('/:product/reviews', (request, response) => {
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
//******************************************************************************************************/
// DELETE  PRODUCT/:product   delete product by the ID
//******************************************************************************************************
router.delete('/products/:product', (request, response) => {
    Product.findByIdAndDelete(request.params.product, error => {
        if (error) throw error;
        response.status(200).send('Product deleted!');
    });
});
//******************************************************************************************************/
// DELETE  REVIEW/:review   delete review by the ID
//******************************************************************************************************
router.delete('/reviews/:review', (request, response) => {
    // Find and delete the specified review object
    Review.findOneAndDelete({
        _id: request.params.review
    }, (error, review) => {
        if (error) throw error;

        // Find the related product and remove [ref to] the review from the product's reviews array
        Product.findOne({
            _id: review.product._id
        }, (error, product) => {
            if (error) throw error;
            product.reviews.splice(product.reviews.indexOf(review._id), 1);
            // Save the product with updated array
            product.save(() => {
                response.status(200).send('Review deleted');
            });
        });
    });
});

module.exports = router

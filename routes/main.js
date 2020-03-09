const router = require('express').Router()
const faker = require('faker')
const mongoose = require('mongoose')
const Product = require('../models/product')
const Review = require('../models/review')

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 5; i++) {
    let product = new Product()

    product._id = new mongoose.Types.ObjectId(),
    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    
    product.save((err) => {
        if (err) throw err
        let review = new Review()
        let ObjectId = mongoose.Types.ObjectId;
        let reviewId = {}
    
        review._id = new mongoose.Types.ObjectId(),
        review.userName = 'Tatiana'
        review.text = 'Great product'
        review.product = product._id
        
        review.save((err , result) => {
            if (err) throw err
            //console.log(`Review posted: ${result._id}`);
            reviewId = { '_id': new ObjectId(result._id)};
            //console.log(reviewId._id)
        }) 

        product.reviews.push(review._id)
        //console.log(product);
        product.save()
    })
  }
  res.end()
})

router.get('/products', (req, res, next) => {
    const perPage = 9;
    const page = req.query.page
    const category =  req.query.category 
    const price = req.query.price
    const productName = req.query.name

    if(!page && !category && !price && !productName) {
        Product.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, products) => {
            // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
            Product.count().exec((err, count) => {
                if (err) return next(err)
                //console.log('All products: ' + products)
                //res.send({products: products, count: count})
                res.send(products)
            })
        })
    }
    //console.log(string.includes(substring));
    if( productName ) {
        Product.find({})
            .exec((err, products) => {               
                Product.count().exec((err, count) => {
                    if (err) return next(err)
                    let result = products.filter((item) => {
                        //console.log(item.name)
                        return item.name.toUpperCase().includes(productName.toUpperCase())
                    })
                    //console.log('From name: ' + result)
                    //res.send({products: products, count: count})
                    res.send(result)
                })
            })
    }

    //We'll want the user (or client) to be able to pass in the following endpoint: /products?page=3
    if(page) {
        Product.find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, products) => {
                // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
                Product.count().exec((err, count) => {
                    if (err) return next(err)
                    //console.log('From page: ' + products)
                    res.send({products})
                })
            })
    }
    //We'll want to be able to pass in an optional query to return only the products of the passed in category. 
    if(category ) {
        Product.find({category: category})
            .exec((err, products) => {
                Product.count().exec((err, count) => {
                    if (err) return next(err)
                    //console.log('From category: ' + products)
                    res.send(products)
                })
            })
    }
    //localhost:8000/products?page=1&category=tools&price=highest
    //localhost:8000/products?page=1&category=tools&price=lowest
    if(price) {
        let mysort = price == 'highest' ? {price: -1} : ( price == 'lowest' ? {price: 1} : '');
        //sort product by price //.sort({ price: 1 })

        Product.find({}) 
            .sort(mysort)           
            .exec((err, products) => {
                Product.count().exec((err, count) => {
                    if (err) return next(err)
                    //console.log('From category: ' + products)
                    //res.send({products: products, count: products.length})
                    res.send(products)
                })
        });
    }
})

// GET /products/:product: Returns a specific product by its id
router.get('/products/:product', (req, res, next) => {
    Product.findById(req.params.product)
        .exec((err, product) => {
            res.send(product)
            //console.log(product);
    });
})

// GET /reviews: Returns ALL the reviews, but limited to 40 at a time. 
//This one will be a little tricky as you'll have to retrieve them out of the products. 
//You should be able to pass in an options page query to paginate.
router.get('/reviews', (req, res, next) => {
    const perPage = 9
    const page = req.query.page || 1

    Product.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, products) => {
            //Product.count().exec((err, count) => {
                if (err) return next(err)
                //need to change to be limit to 40
                let reviews = []
                products.forEach( item => 
                    reviews.push(item.reviews)
                ) 
                console.log(reviews)
                res.send(reviews)
            //})
        })
})

// POST /products: Creates a new product in the database
router.post('/products', (req, res, next) => {
    let product = new Product()
    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    product.reviews = []

    product.save((err , result) => {
        if (err) return next(err);
        console.log(`Product posted: ${result}`);
    })
    res.send(product)
});

// POST /:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.
router.post('/products/:product/reviews', (req, res, next) => {    
    Product.findById(req.params.product)
        .exec((err, product) => {
            let review = new Review()
            let ObjectId = mongoose.Types.ObjectId;
            let reviewId = {}

            review._id = new mongoose.Types.ObjectId(),
            review.userName = 'Tatiana'
            review.text = 'Do not purchase the product! Bad quality.'
            review.product = product._id

            //console.log(product._id)

            review.save((err , result) => {
                if (err) return next(err);
                //console.log(`Review posted: ${result}`);
                reviewId = { '_id': new ObjectId(result._id)};
            })
            //console.log(product.reviews);
            product.reviews.push(review._id)
            //console.log(product);
            product.save()
            res.end()
      }); 
});

// DELETE /products/:product: Deletes a product by id
router.delete('/products/:product', (req, res, next) => { 
    let productId = req.params.product 

    Product.findByIdAndRemove(productId, (err, product) => {
        if (err) return next(err);
        res.send('Product deleted successfully!');
    }) 
    //delete all reviews for deleted product
    Review.deleteMany({product: productId}, (err) => {
        if (err) return next(err);
        console.log('Reviews deleted successfully!');
    })
});

// DELETE /reviews/:review: Deletes a review by id
router.delete('/reviews/:review', (req, res, next) => {    
    Review.findById(req.params.review, (err, review) => {
        if (err) return next(err);
        Product.update(
            { _id: review.product},
            {'$pull': { 'reviews': review._id } }
          ).exec((err , result) => {
            if (err) return next(err);
            console.log('Review id removed from product successfully!');
        });

        review.remove()

        res.send('Review deleted successfully!');
    }) 
});

module.exports = router
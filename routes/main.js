const router = require('express').Router()
const faker = require('faker')
const mongoose = require('mongoose')
const Product = require('../models/product')
const Review = require('../models/review')

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 5; i++) {
    let product = new Product()
    let review = new Review()
    let ObjectId = mongoose.Types.ObjectId;
    let reviewId = {}

    review.userName = 'Tatiana'
    review.text = 'Great product'

    review.save((err , result) => {
        if (err) throw err
        console.log(`Review posted: ${result._id}`);
        reviewId = { '_id': new ObjectId(result._id)};
        console.log(reviewId._id)
    }) 

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    product.reviews.push(reviewId._id)

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

router.get('/products', (req, res, next) => {
    const perPage = 9;
    const page = req.query.page || 1

    Product.find({})
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

// GET /products/:product: Returns a specific product by its id
//5e6156ee75691e650650d2cb
//5e6156ee75691e650650d2d3
router.get('/products/:product', (req, res, next) => {
    const productId = req.params.product
    //console.log(productId)
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
        if (err) throw err
        console.log(`Product posted: ${result}`);
    })

});
// POST /:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.
router.post('/products/reviews', (req, res, next) => {
    //  Product.find(err, products) => {
    //     Product.populate(products, { path: 'reviews' }, (err, data) => {
    //         if (err) throw err
    //         console.log(data);
    //       });
    // //     for (let i = 0; i < products.length; i++) {
    // //         let review = new Review()
    // //         review.userName = 'Tatiana'
    // //         review.text = 'Great product: Incredible Frozen Shirt'
    // //         review.product = products[i]._id
        
    // //         review.save((err , result) => {
    // //             if (err) throw err
    // //             console.log(`Review posted: ${result}`);
    // //         }) 
    // //     }     
    // });
    //  res.end()     
     Product.find((err, products) => {
        //now we have an array of critics
        Product.populate(products, { path: 'reviews' }, (err, data) => {
          //now data is an array of populated critics
          console.log(data);
        });
      }); 
});
// DELETE /products/:product: Deletes a product by id

// DELETE /reviews/:review: Deletes a review by id

module.exports = router
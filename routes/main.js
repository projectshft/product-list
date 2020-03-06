const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/product');
const Reviews = require('../models/review');
// ******************** Route below was used to initally populate the Products DB **********************//
// router.get('/generate-fake-data', (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product()

//     product.category = faker.commerce.department()
//     product.name = faker.commerce.productName()
//     product.price = faker.commerce.price()
//     product.image = 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2552&q=80'

//     product.save((err) => {
//       if (err) throw err
//     })
//   }
//   res.end()
// })

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
});

// Returns a specific product by its id
router.get('/products/:product', (req, res, next) => {
    const productId = req.params.product

    Product
        .findById(productId)
        .exec((err, product) => {
          if (err) {
            res.writeHead(401, ("Error"), {
                "Content-Type": "html/text"
            });
            res.end("Error: There was no product in our record matching that productId")
            return console.error(err);
          } else {
              res.send(product)
          }

        })

});

// Returns ALL the reviews, but limited to 40 at a time. 
// This one will be a little tricky as you'll have to retrieve them out of the products.
//  You should be able to pass in an options page query to paginate.
router.get('/reviews', (req, res, next) => {
    const perPage = 9

    // return the first page by default
    const page = req.query.page || 1

    Reviews
        .find({})
        .populate("reviews")
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, reviews) => {
            // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
            Product.count().exec((err, count) => {
                if (err) return next(err)

                res.send(reviews)
            })
        })

});

// Creates a new product in the database
router.post('/products', (req, res, next) => {});

// Creates a new review in the database by adding it to the correct product's reviews array.
router.post('/products/:reviews', (req, res, next) => {});

// Deletes a product by id
router.delete('/products/:product', (req, res, next) => {});

// Deletes a review by id
router.delete('/products/:reviews', (req, res, next) => {})


module.exports = router
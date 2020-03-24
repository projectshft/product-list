const router = require('../node_modules/express').Router();
const faker = require('faker');
const Product = require('../models/product');
const Reviews = require('../models/review');
// const cors = require('./node_modules/cors')
// ******************** Route below was used to initally populate the Products DB **********************//
// router.get('/generate-fake-data', (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product()
//     let reviews = new Reviews({
//         username: faker.internet.userName(),
//         text: faker.company.catchPhrase(),
//         product: product._id
//     })


//     reviews.save();
//     product.category = faker.commerce.department()
//     product.name = faker.commerce.productName()
//     product.price = faker.commerce.price()
//     product.image = 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2552&q=80'

//     product.save((err) => {
//       if (err) throw err
//     })

//     product.reviews.push(reviews)
//   }
//   res.end()
// })

router.get('/products', (req, res, next) => {
    const perPage = 9

    // return the first page by default
    const page = req.query.page || 1
    // variable for category if entered on the query
    const searchedCategory = req.query.category
    //variable for price if entered on the query 
    const priceRange = req.query.price
    // variable for the text inputed through the search
    const searchQuery = req.query.search

    // Adaptive variables
    let filteredQuery = {};
    let sortCategory = "";

    // If category is entered on the request
    if (searchedCategory) {
        filteredQuery = {
            category: searchedCategory
        }
    }

    // If a product name was typed in the search input
    if (searchQuery) {
        filteredQuery = {
            $textInput: {$search: searchQuery}
        }
    }

    // if a search input was entered and a category specified
    if (searchQuery && searchedCategory) {
        filteredQuery = {
            category: searchedCategory,
            $textInput: {$search: searchQuery}
        }
    }

    //Sorting by price if query was entered
    
    if (priceRange == 'highest') {
       sortCategory = {price: -1}
    } else if (priceRange == 'lowest') {
       sortCategory = {price: 1}
    }


    Product
        .find(filteredQuery)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .sort(sortCategory)
        .exec((err, products) => {
            Product.distinct("category").exec((err, categories) => {
                   // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
                   Product.countDocuments().exec((err, count) => {
                    if (err) return next(err)

                    res.send({
                        product: products,
                        productCount: count
                    })
                })


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
router.post('/products', (req, res, next) => {
    //Make an instance of the product model
    let newProduct = new Product({
        category: faker.commerce.department(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: 'https://images.unsplash.com/photo-1542395765-761de4ee9696?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
        reviews: []
    });

    //Save the new product in the db and added edge cases
    newProduct
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created product successfully",
                createdProduct: {
                    category: result.category,
                    name: result.name,
                    price: result.price,
                    image: result.image,
                    reviews: result.reviews,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/products" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

// Creates a new review in the database by adding it to the correct product's reviews array.
router.post('/:product/reviews', (req, res, next) => {
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
                //Make an instance of the Reviews model
                let newReview = new Reviews({
                    username: faker.internet.userName(),
                    text: faker.company.catchPhrase(),
                    product: product._id
                });
                //Save the newly created review
                newReview.save();
                //Addd the new review to the associated product then save  it 
                product.reviews.push(newReview);
                product.save()

                res.send(product)
            }

        })

});

// Deletes a product by id
router.delete('/products/:product', (req, res, next) => {
    Product
        .findByIdAndDelete(req.params.product)
        .exec((err, product) => {
            if (err) return next(err)

            res.writeHead(200, ("Success"), {
                "Content-Type": "html/text"
            });
            res.end(`Success: The product was deleted from the DB.`)

        })
});

// Deletes a review by id
router.delete('/reviews/:review', (req, res, next) => {
    //Changed the path because the review is actually stored in the reviews collection
    Reviews
        .findByIdAndDelete(req.params.review)
        .exec((err, review) => {
            if (err) return next(err)

            res.writeHead(200, ("Success"), {
                "Content-Type": "html/text"
            });
            res.end(`Success: The review was deleted from the DB.`)

        })
})


module.exports = router
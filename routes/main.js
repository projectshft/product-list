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

    const category = req.query.category
    const price = req.query.price

    Product.find({})
        //return products within the category
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec((err, products) => {
            if (category) {
                Product.find({
                        category
                    })
                    .skip(perPage * page - perPage)
                    .limit(perPage)
                    .exec((err, products) => {
                        if (err) {
                            console.error(err)
                        } else {
                            res.send(products)
                        }
                    })
                //sorting by price or category or both
            } else if ((category, price == 'lowest')) {
                Product.find({})
                    .skip(perPage * page - perPage)
                    .limit(perPage)
                    .sort({
                        price: 1
                    })
                    .exec((err, products) => {
                        if (err) {
                            console.error(err)
                        } else {
                            res.send(products)
                        }
                    })
                // lowest price to highest
            } else if (price == 'lowest') {
                Product.find({})
                    .skip(perPage * page - perPage)
                    .limit(perPage)
                    .sort({
                        price: -1
                    })
                    .exec((err, products) => {
                        if (err) {
                            console.error(err)
                        } else {
                            res.send(products)
                        }
                    })
                // highest to lowest
            } else if ((category, price == 'highest')) {
                Product.find({})
                    .skip(perPage * page - perPage)
                    .limit(perPage)
                    .sort({
                        price: -1
                    })
                    .exec((err, products) => {
                        if (err) {
                            console.error(err)
                        } else {
                            res.send(products)
                        }
                    })
                // for only highest price in query
            } else if (price == 'highest') {
                Product.find({})
                    .skip(perPage * page - perPage)
                    .limit(perPage)
                    .sort({
                        price: -1
                    })
                    .exec((err, products) => {
                        if (err) {
                            console.error(err)
                        } else {
                            res.send(products)
                        }
                    })
            } else {
                if (err) {
                    console.error(err)
                } else {
                    res.send(products)
                }
            }
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
// router.delete('/reviews/:review', (request, response) => {
//     Product.findByIdAndDelete(request.params.product, error => {
//       if (error) throw error;
//       response.status(200).send('Product deleted!');
//     });
//   });

router.delete('/reviews/:review', (request, response) => {
    // const productId = request.params.review
    // console.log(productId)
    // Review.findByIdAndDelete(productId, (err, review) => {
    //     console.log('rev ',review)
    //     if (err) throw err;
    //     response.status(200).send("Review successfully deleted ");
    // })

    // let deleteReviewId = request.params.review;
    // console.log('logging ', deleteReviewId)
    const productId = request.params.review
    console.log('product ID : ',productId)
    Product.find({})
        .exec((error, products) => {
            Product.count().exec((error, count) => {
                if (error) throw error;

                const reviewsAll = [];
                for (i in products) {
                    if ( products[i].reviews[0] != undefined) { 
                        console.log('products[0].reviews[i] ',products[i].reviews[0]._id);
                        if (products[i].reviews[0]._id == productId) {
                            console.log('found it ', products[i].reviews[0]._id)
                            let toBeDeleted = products[i].reviews[0]._id;
                            // .remove(toBeDeleted)
                            
                            // Product.findByIdAndDelete(request.params.product, error => {
                            //     if (error) throw error;
                            //     response.status(200).send('Product deleted!');
                            // });

                            products.update(
                                { _id: { productId}} ,// if you want can add query for specific Id {"_id" : requestId},
                                { $pull: { reviews: { _id: { productId} } } }, // if need can convert iso date string like: new Date(yourDate).toISOString()
                                { multi: true }
                              )

                            // Product.update(
                            //     {"_id" : productId},// if you want can add query for specific Id {"_id" : requestId},
                            //     { $pull: { reviews: { } } }, // if need can convert iso date string like: new Date(yourDate).toISOString()
                            //     { multi: true }
                            //   )
                            // toBeDeleted.remove(
                            //     { },
                            //     { $pull: { reviews: { _id: productId } } },
                            //     { multi: true }
                            //   )
                        }
                    } else {
                        i ++
                        console.log('bad')
                    }

                    
                    
                    // if ( products[i].reviews[0] === productId )
                    // console.log('id find ', productId)
                    //reviewsAll.push(products[i].reviews)
                } 
                // Product.find({
                //         "reviews._id" : "_id:ObjectId(" + deleteReviewId + ")"



                // console.log('review all : ',reviewsAll[0][0])
                // for ( p in reviewsAll) {
                //     if (reviewsAll[0][i] == { _id: productId }) {
                //         console.log(' find it!!!!! ', reviewsAll[0[i]])
                //     }
                // }   
                //     } else {
                        response.send(reviewsAll);
                //    }
             //   }
                
            });
        });


    // let findProduct = Product.find({"reviews.Object._id": ObjectId("5e6180ed7c923e54f8ed32f9")},
    // {"reviews.$": true})

    // let findProduct = Product.find({
    //     reviews: {
    //         $elemMatch: {
    //             _id: deleteReviewId,
    //         }
    //     }
    // }).sort({
    //     createdAt: 1
    // });

    // let findProduct = Product.find({
    //      _id : deleteReviewId })
    // { reviews: { $elemMatch: { _id: ObjectId("5e6180ed7c923e54f8ed32f9") } } } )
   // console.log(findProduct)
    //   let findAgain =  Product.find({})
    //         .exec((error, products) => {
    //             Product.count().exec((error, count) => {
    //                 if (error) throw error;

    //                 const toBeDeleted = [];
    //                 for (i in products) {
    //                     if ( products[i]._id == deleteReviewId)
    //                     toBeDeleted.push(products[i].reviews)
    //                 }
    //                 console.log('findAgain ',toBeDeleted)
    //                 response.send(toBeDeleted);
    //             });
    //         });

    //  let finding = Product.find({
    //     "reviews._id" : "_id:ObjectId(" + deleteReviewId + ")"
    //  })
    //  console.log("finding ",finding)



    //  Product.find({
    //         "reviews": {
    //           "$elemMatch": {
    //             "_id": deleteReviewId,

    //           }
    //         }
    //       }, {
    //         "review.$._id": 1 // "accounts.$": 1 also works
    //       })
    //       console.log(finding)


    // Product.remove({_id: deleteReviewId}, (error) =>{
    //   if (error) throw error;
    //   response.send(`Review has been removed`)
    // })
})




module.exports = router
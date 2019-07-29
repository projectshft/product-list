const router = require( 'express' ).Router();
const faker = require( 'faker' );
const Product = require( '../models/product' );
const Review = require(  '../models/review' );

//The genereate-fake-data API creates all the data or products for our database.  Two reviews are created per product but created within their own review colleciton.  Just the id numbers are saved across collections.
router.get( '/generate-fake-data', ( req, res, next ) => {
    for ( let i = 0; i < 90; i++ ) {
        let product = new Product({

            category: faker.commerce.department(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: faker.image.image(),
            enabled: true,
            dateAdded: new Date(),
            dateLastModified: new Date(),
            reviews: []
        });
        
        let review1 = new Review({
            
            userName: faker.internet.userName(),
            text: faker.commerce.productAdjective(),
            product: product._id,
            enabled: true,
            dateAdded: new Date(),
            dateLastModified: new Date(),
        });

        let review2 = new Review({

            userName: faker.internet.userName(),
            text: faker.commerce.productAdjective(),
            product: product._id,
            enabled: true,
            dateAdded: new Date(),
            dateLastModified: new Date(),
        });

        review1.save();
        review2.save();

        product.reviews.push( review1, review2 );

        product.save(( err ) => {
            if ( err ) {

                res.writeHead( 400, "You " );

                return res.send( err );
            } 
        })
    }
    res.writeHead( 200, "Fake Data Generated" );

    return res.end('Fake Data Generated');
})



//The get('products') endpoint takes an object with 4 paramters: category, sort, and pageNumber.  These can be used to filter the total list of products and sort them by price.  The pageNumber can be used to navigate different pages, when the products list spans multiple pages.
router.get( '/products', ( req, res, next ) => {
    let perPage = 9;
    let pageNumber = req.query.pageNumber || 1;
    let sort = null;
    let sortType = '';
    let exclude = null;
    let query =  { enabled: true };
    let newQuery = Object.assign({}, query)
    let searchResultsCount = null
    let categoryList = [];
    let pages;
    let pageArray = []

    if (req.query.category && typeof req.query.category === "string" ) {
        newQuery.category = req.query.category
    }

    if ( req.query.sort === 'descending' || req.query.sort === "ascending" ) {
        
        sort = { sort: { price: req.query.sort } }
    }

    if ( req.query.exclude && typeof req.query.exclude === "string" ) {
        let fieldNegator = '-'
        let excludedFields = req.query.exclude;

        exclude = excludedFields.split(' ').map(field => fieldNegator.concat(field)).join( ' ' )
    }


    Product 
        .find( query )
        .exec(( err, docs ) => {
            docs.forEach( doc => {
            if ( !categoryList.includes( doc.category ) ) {
                categoryList.push( doc.category )
            }
        } )
    });

    Product 
        .find( newQuery, exclude , sort)
        .skip(( perPage * pageNumber ) - perPage )
        .limit( perPage )
        .exec(( err, products ) => {

            Product.countDocuments( newQuery, (err, count) => {

                count/perPage > 1 ? pages = count/perPage : pages = 1

                for (i = 1; i <= pages; i++) {
                    pageArray.push(i)
                }


                //Here is the object the client will be returned upon a successful request.
                res.send( {count:searchResultsCount, pages, categoryList, products:products, pageArray} );
            })
        })
  });


//this route accesses a specific product based on the product _id number.
router.get( '/products/:product', ( req, res, next ) => {
    if ( req.params.product ) {
        let product;

        Product.findOne({ _id: req.params.product }).exec(( err, foundProduct ) => {
            if ( err ) return next( err );

            product = foundProduct;

            if( product ) {
                res.send( product );

            } else {
                res.writeHead( 404, "That product is not accessible in our database" );

                return res.end();
            }
        });  
    } else {
        res.writeHead( 400, "You must submit a query with a product id" );

        return res.end();
    }
});


//this route returns the collection of reviews in thd dataabse
router.get( '/reviews', ( req, res, next ) => {
    let perPage = 40;
    let page = req.query.page || 1;

    Review
        .find( { enabled: true } )
        .skip(( perPage * page ) - perPage )
        .limit( perPage )
        .exec(( err, reviews ) => {
            Review.count().exec(( err, count ) => {
                if ( err ) return next( err );

                return res.send( reviews );
            })
        })
} )


//this route posts new products to the database
router.post( '/products', ( req, res, next ) => {
    if ( Object.keys(req.body).length > 0 ) {
        let newProduct = new Product ({

            category: req.body.category,
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            enabled: true,
            dateAdded: new Date(),
            dateLastModified: new Date(),
            reviews: []
        })
    
        newProduct.save(( err ) => {
            if ( err ) return res.send( err )
        })
    } else {
        res.writeHead( 400, "You must send new product information" )

        return res.end()
    }
});


//this route retrieves the array of posts associated with a particular product.
router.post( '/:product/reviews', ( req, res, next ) => {
    if ( req.params.product ) {
    
        Product
            .findOne({ _id: req.params.product })
            .exec(( err, product ) => {

                let review = new Review({
                    userName: req.body.userName,
                    text: req.body.text,
                    product: product._id,
                    enabled: true,
                    dateAdded: new Date(),
                    dateLastModified: new Date(),
                });

                review.save(( err ) => {
                    if ( err ) {
                        return res.send( err )
                    }
                })
                    
                product.reviews.push( review );

                product.save(( err ) => {
                    if ( err ) {
                        return res.send( err )
                    }
                })
            })
    } else {
        res.writeHead( 400, "You must submit a product id" );

        return res.end();
    }
})

//this route chagnes the products enabled property from true to false, removing it from the list of products that the client will receive on a get request.  The disabled product remains in the database until it's enabled property is reset by the server.
router.delete( '/products/:product', ( req, res, next ) => {
    if ( req.params.product ) {

        Product
            .findOne({ _id: req.params.product })
            .exec(( err, product ) => {

                product.enabled = false;
                product.dateLastModified = new Date();

                product.save(( err ) => {
                    if ( err ) return err;
                })
            })
    } else{
        res.writeHead( 400, "You must enter a product id" )

        return res.end()
    }
})

//this route chnages the reviews enabled property from true to false, removing it from the list of products that the client will receive on a get request.  The disabled product remains in the database until it's enabled property is reset by the server.
router.delete( '/reviews/:review', ( req, res, next ) => {
    if ( req.params.review ) {

        Review
            .findOne({ _id: req.params.review })
            .exec(( err, review ) => {

                review.enabled = false;
                review.dateLastModified = new Date();

                review.save(( err ) => {
                    if ( err ) return res.send( err )
                })
            })
    } else {
        res.writeHead( 400, "You must enter a review id" );

        return res.end();
    }
})

module.exports = router
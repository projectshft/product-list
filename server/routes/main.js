const router = require( 'express' ).Router();
const faker = require( 'faker' );
const Product = require( '../models/product' );
const Review = require(  '../models/review' );

router.get( '/generate-fake-data', ( req, res, next ) => {
    for ( let i = 0; i < 90; i++ ) {
        let product = new Product({

            category: faker.commerce.department(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png',
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



router.get( '/products', ( req, res, next ) => {
    let perPage = 10;
    let page = req.query.page || 1;
    let sort = null;
    let sortType = '';
    let exclude = null;
    let query =  { enabled: true };

    if (req.query.category && typeof req.query.category === "string" ) {
        query.category = req.query.category
    }

    if ( req.query.price === 'highest' || req.query.price === "lowest" ) {
        req.query.price === "highest" ? sortType = 'desc' : sortType = 'asc' 
        
        sort = { sort: { price: sortType } }
    }

    if ( req.query.exclude && typeof req.query.exclude === "string" ) {
        let fieldNegator = '-'
        let excludedFields = req.query.exclude;

        exclude = excludedFields.split(' ').map(field => fieldNegator.concat(field)).join( ' ' )
    }

    Product
        .find( query, exclude , sort )
        .skip(( perPage * page ) - perPage )
        .limit( perPage ) 
        .exec(( err, products ) => {

            Product.count().exec(( err, count ) => {
                if ( err ) return next( err ); 

                res.send( products );
            })
        })
  });



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
const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')



//Only do this 1 or 2 times, then comment out...else have extra data every time

// router.get('/generate-fake-data', (req, res, next) => {
//     for (let i = 0; i < 90; i++) {
//         let product = new Product()

//         product.category = faker.commerce.department();
//         product.name = faker.commerce.productName();
//         product.price = faker.commerce.price();
//         product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

//         product.reviews = [];
//         let review = new Review({
//             userName: faker.internet.userName(),
//             reviewText: faker.lorem.sentence(),
//             productId: product._id
//         });
//         review.save()
//         product.reviews.push(review);

//         product.save((err) => {
//             if (err) throw err
//         })
//     }
//     res.end()
// });

//create our paginating GET route
router.get('/products', (req, res, next) => {
    const perPage = 9
    // return the 1st page by default
    const page = req.query.page || 1
    let category = req.query.category || undefined
    let sortDirection = req.query.price || undefined
    
    let query = {};

    //if the URL includes an optional query for category, add that category to the request body query object
    if (category) {
        query = {
            category: category
        }
    }

    // if the user chooses to sort, sort the found products in proper order by price
    if (sortDirection == "highest") {
         sortDirection = 'desc';
    } else if (sortDirection == "lowest") {
         sortDirection = "asc"
    } else {
         sortDirection = null
    }


    Product
        .find(query)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
        .sort({price: sortDirection})
        .exec((err, product) => {
            Product.estimatedDocumentCount().exec((err, count) => {
                if (err) return next(err)
                res.send(product)
            })
        })
});

router.get('/products/:ProductId', ((req, res, next) => {
    Product.findById(req.params.ProductId, (err, product) => {
        if (err) {
            return console.error(err);
        } else {
            res.send(product);
        }
    })
}))


//Creates a new product in the database
router.post('/products', ((req, res, next) => {
    const newProduct = new Product({
        category: req.body.category,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        reviews: []
    });
    newProduct.save((err) => {
        if (err) return err;
        res.send(newProduct);
    });
}))

//Deletes a product by id
router.delete('/products/:productId', (req, res, next) => {
    Product
        .findByIdAndDelete(req.params.productId, (err) => {
            if (err) throw err;
            res.status(200).send("Delete was successful.");
        })
}
)


module.exports = router
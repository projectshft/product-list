const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
 

//reviews is an array of objects

// var reviews =[{
//   userName:"",
//   text:"",
//   product:""
// }]

router.get('/generate-fake-data', (req, res, next) => {
    for (let i = 0; i < 90; i++) {
        let product = new Product()

        product.category = faker.commerce.department()
        product.name = faker.commerce.productName()
        product.price = faker.commerce.price()
        product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

        product.save((err) => {
            if (err) throw err
        })
    }
    res.end()
})


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

// //returns a specific product by its id
router.get('/products/:product', (req, res, next) => {
const productId= Number(request.params.id);
const getProduct = products.find((product) => product.id === productId);

if (!getProduct) {
  Response.status(500).send('Product not found')//error message for wrong id#
}
else {
  Response.json(getProduct);
  }
 });

//  //returns all the reviews limited to 40 at a time, ability to pass in options
//  //page query to paginate
// router.get('/reviews')

// //creates new product in database
router.post('/products', (req, res, next) => {
  const newProduct = request.body;
  products.push(newProduct);
  response.json(products);
})


// //creates new review in the database by adding to a products reviews array
router.post('/products/reviews', (req, res, next) => {
  const newReview = request.body;
  reviews.push(newReview);
  response.json(reviews);
})

// //deletes product by id
router.delete('/products/:product', (req, res, next) => {
const productId = Number(request.params.id);
const newProducts = products.filter((product) => product.id != productId);

if (!newProducts) {
  response.status(500).send('Product not found');//error message if wrong id#
}
else {
  products = newProducts;
  response.send(products)//return new products array minus deleted product
 }
});


// //deletes review by id
router.delete('/reviews/:review', (req, res) => {
  const reviewId = Number(request.params.id);
  const newReview = reviews.filter((reviews) => review.id != reviewId);
  
  if (!newReviews) {
    response.status(500).send('Review not found');//error message if wrong id#
  }
  else {
    reviews = newReviews;
    response.send(reviews)//return new reviews array minus deleted review
   }
});

module.exports = router
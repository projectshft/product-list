const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')

//Generate fake products, should only run this a few times
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

//get /products

router.get('/products', (request, response, next) => {
  // response.send('Hello World');
  // response.end();

  Product.find().exec((error, result) => {
    if (error) { return console.error(error); }
    response.send("These are your products");
    // response.send(result);
    response.end();
  });
})


//GET /products/:product: Returns a specific product by it's id
router.get('/products/:product', (request, response,next) => {
  response.send('You chose product 12345');
  response.end();
})


// GET /reviews: Returns ALL the reviews, but limited to 40 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an options page query to paginate.
router.get('/reviews', (request, response,next) => {
  response.send('Here are the first 40 reviews');
  response.end();

})


// POST /products: Creates a new product in the database




// POST /:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.



// DELETE /products/:product: Deletes a product by id




// DELETE /reviews/:review: Deletes a review by id




module.exports = router
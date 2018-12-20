const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const querystring = require('querystring');
const url = require('url');

//look into middleware for handling errors

router.get('/products', (req, res, next) => {
  //get the total number of products and figure out how many pages of 10 there are
  Product.find({}, (err, products) => {
    if (err) throw err;
    const numProducts = products.length;
    const maxPages = Math.ceil(numProducts/10);
    //pull the page query off the URL
    const parsedUrl = url.parse(req.originalUrl);
    let { page } = querystring.parse(parsedUrl.query);
    //user didn't include page in the query, so default to the first
    if (typeof page === 'undefined') {
      page = 1;
    //coerce it to a number
    } else {
      page = Number(page)
    }
    //if page wasn't a number or was less than 1, handle the error
    if (!page || page < 1 || page > maxPages) {
      res.status(404);
      res.send('Page not found');
    } else {
    //use mongoose's paginate package to return the requested page with a limit of 10 products
      Product.paginate({}, { page: page, limit: 10 }, (err, products) => {
        res.send(products);
      })
    }
  })
});

// router.get('/products/:product', (req,res) => {
//  res.send(req.product)
// })


//route for initially generating data - development only
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

module.exports = router
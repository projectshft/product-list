const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/product').Product;
const Review = require('../models/product').Review;

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

//user should be able to make a get request using optional parameters of page and category
//each page will represent 9 product.  If no page is specified, user will recieve first 9 products. If user specifies page=2, they will recieve products 10-18; and so on...
//if user specifies a category, they will recieve product that belong to the specified category.
router.get('/products?:page?:category?:price?', (req, res, next) => {
  const page = req.query.page || 1;
  const perPage = 9;
  const category = req.query.category;
  const price = req.query.price;
  let query = {};
  let sortQuery = {};
  
  //if there is a category, set the queryInput variable in mongo query find format
  if (category) {
    //reformat category query param to ensure that the first letter is uppercase before searching the db
    let formattedCategory = category.replace(/^\w/, c => c.toUpperCase());
    query = { category: formattedCategory }
  }

  //if a price sort order is sent in the request, set the priceQuery variable to the correct search parameter
  if(price) {
    if (price === 'highest') {
      sortQuery = { price: 'desc' }
    } else 
    if(price === 'lowest') {
      sortQuery = { price: 'asc'}
    } else {
      //error - must choose to sort by highest or lowest
    }
  }

  Product
    .find(query)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort(sortQuery)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err)

        res.send(products)
      })
    })
});

//returns a specific product by its id
router.get('/products/:id', (req, res, next) => {
  let productObject = Product.findById(req.params.id, (err, product) => {
    if (err) {
      //do some error handling
      return next(err)
    }
    res.send(product);
  });
});

router.get('/reviews', (req, res, next) => {
  const perPage = 40

  // return the first page by default
  const page = req.query.page || 1

  Review
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      Product.count().exec((err, count) => {
        if (err) return next(err)

        res.send(reviews)
      })
    })
})

//creates a new product in the databas
router.post('/products', (req, res, next) => {
  let newProductObj = new Product(req.body);
  newProductObj.save()
  res.send(newProductObj)
});


//creates a new review in the database by adding it to the correct product views array
router.post('/:productId/reviews', (req, res, next) => {
  let newReview = new Review();

  newReview.userName = req.body.userName;
  newReview.text = req.body.text;
  newReview.productId = req.params.productId;

  //save the review to the db reviews collection
  newReview.save()

  //find the product the review is for and push the review's id to the reviews array on the product object
  Product.findById(req.params.productId, (err, product) => {
      if (err) {
        //do soem error handling if you wnat
        return next(err)
      }
      product.reviews.push(newReview);
      product.save();
      res.send(newReview);
    });
});

//deletes a product by id
router.delete('/products/:id', (req, res, next) => {
  Product.findByIdAndDelete(req.params.id, (err, product) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Product successfully deleted",
    };
    return res.status(200).send(response);
  });
});

module.exports = router
const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/products')

router.param('product', (req, res, next, id) => {
  // find the product by the id provided in the request and set
  Product.findById(id, (err, product) => {
    if (err) throw err
    // set req.product equal to the the found product
    else req.product = product;

    // verify a product exists
    if(!req.product) {
      // if no product, send an error message
      return res.status(404)
        .send('Cannot find product');
    }
    next();
  })
})

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
  return res.end();
})

// this is a route to add fake reviews to the products
router.get('/generate-fake-reviews', (req, res) => {
  Product.find({}, (err, products) => {
    products.forEach((product) => {
      let fakeReview = {
        username: faker.name.firstName(),
        text: `Do not buy ${product.name} it's the worst product ever`,
        product: product.name
      }

      product.reviews.push(fakeReview)
      product.save();
    })
  })
  return res.end();
})

// GET /products: Allow the user to retrieve the products from the database.
// Results will be limited to 9 per page. Allow the user to request a specific
// page and the ability to filter by category and sort by price. If no page,
// category or sort method is provided, the first 9 entries will be given
router.get('/products', (req, res) => {
  const page = req.query.page || 1;
  const perPage = 9
  const skipCount = (page - 1) * perPage;
  const query = {}
  const priceSort = {};
  const { category } = req.query;
  const sortBy = req.query.price;
  
  // if a category is given, add it to the query object
  if (category) {
    query.category = category;
  }

  // if a sort preference is given, update the priceSort object
  if (sortBy) {
    if (sortBy === 'highest') {
      priceSort.price = 'desc';
    } else if (sortBy === 'lowest') {
      priceSort.price = 'asc';
    } 
  }

  // find the products that match the optional params, sort the results by the optional sort method,
  // skip the number of products neccessary to get to the requested page
  Product
    .find(query)
    .sort(priceSort)
    .skip(skipCount)
    .limit(perPage)
    .exec((err, products, next) => {
      Product.count(query).exec((err, productCount) => {
        if (err) return next(err)

        // write the response headers and return the products requested and the number of products
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Authentication');
        return res.send({products: products, productCount: productCount})
      })
    })
})

// GET /products/:product: Returns a specific product by it's id
router.get('/products/:product', (req, res) => {
  // write the response headers and send back the requested product.
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Authentication');
  return res.send(req.product);
})

// GET /reviews: Returns ALL the reviews, but limited to 40 at a time. 
// the user should be able to pass in an options page query to paginate.
router.get('/reviews', (req, res) => {
  const page = req.query.page || 1;
  const perPage = 40
  const skipCount = (page - 1) * perPage;

  // find all the products with reviews in order to get each products reviews
  Product.find({reviews: {$exists: true}}, (err, products) => {
    if (err) throw err

    // save an empty array to hold the reviews
    let reviews = [];

    // add the reviews from each of the found products to the reviews array
    products.forEach((product) => {
      reviews = reviews.concat(product.reviews)
    })

    // write the response headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Authentication');

    // return the portion of the reviews that was requested
    return res.send(reviews.slice(skipCount, skipCount + perPage));
  })
})

// POST /products: Creates a new product in the database
router.post('/products', (req, res) => {
  const newProduct = new Product({...req.body})

  // save the new product
  newProduct.save((err) => {
    if (err) throw err
    else console.log('Product saved')
  });

  return res.end();
})

// POST /:product/reviews: Creates a new review in the database by adding 
// it to the correct product's reviews array.
router.post('/:product/reviews', (req, res) => {
  req.product.reviews.push(req.body);

  req.product.save((err) => {
    if (err) throw err

    console.log('Saved: ', req.body);
  });

  return res.end();
})

// DELETE /products/:product: Deletes a product by id
router.delete('/products/:product', (req, res) => {
  // delete the product
  req.product.remove();

  return res.end();
})

// DELETE /reviews/:review: Deletes a review by id
router.delete('/reviews/:review', (req, res) => {
  const reviewId = req.params.review;

  // find the product that contains the review
  Product.findOne({reviews: {$elemMatch: {_id: reviewId}}}, (err, product) => {
    if (err) throw err
    else {
      // find the review from found product's reviews
      const review = product.reviews.find((review) => {
        return review._id === reviewId
      })
      // get the index of the review
      const reviewIndex = product.reviews.indexOf(review)
      // using the index, remove the review from the product's reviews array
      product.reviews.splice(reviewIndex, 1);

      // save the product
      product.save();

      return res.end();
    }
  })
})

module.exports = router
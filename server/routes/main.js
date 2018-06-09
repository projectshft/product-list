const router = require('express').Router()
const faker = require('faker')
const ProductSchemas = require('../models/product');
const Product = ProductSchemas.Product;
const Review = ProductSchemas.Review;

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

router.param('product', (request, response, next) => {
  let requestedProductId = request.params.product
  try {
  Product.findById(requestedProductId, (err, product) => {
    if(err) throw err;
    if(product !== {}){
      request.product = product;
      next() 
    } else {
      response.status(400).send('Product has no values')
    }
  })}
  catch(err){
    response.send("Invalid Product Id")
  }
});

router.get('/products', (request, response) => {
  let requestedCategory = request.query.category
  let requestedPage = request.query.page
  let requestedSort = request.query.price
  let query;
  let queryCount;
  if(requestedCategory && requestedCategory !== 'DISREGARD'){
    query = Product.find({category: { $regex: new RegExp(requestedCategory, 'i')}})
    query.count((err, count) =>{
      queryCount = count
    })
    query = Product.find({category: { $regex: new RegExp(requestedCategory, 'i')}})
  } else {
    query = Product.find({})
    query.count((err, count) => {
      queryCount = count
    })
    query = Product.find({})
  }
  if(requestedSort == 'highest' || requestedSort == "lowest"){
    switch(requestedSort){
      case 'highest':
        query = query.sort({price: -1});
        break;
      case 'lowest':
        query = query.sort({price: 1});
          break;
    }
  }

  if (!requestedPage || requestedPage < 0) {
      query.limit(9).exec((err, products) => {
        if (err) throw err;
        return response.send({ products: products, total: queryCount })
      });

  } else {
    let startResultsNumber = (requestedPage - 1) * 9
      query.skip(startResultsNumber).limit(9).exec((err, products) => {
        return response.send({ products: products, total: queryCount });
      })
  }
});

router.get('/products/:product', (request, response) => {
  return response.send(request.product);
});

router.get('/reviews', (request, response) => {
  Product.find({reviews: {$exists: true, $ne : []}}).exec((err, docs) => {
    let reviewsArray = []
    docs.forEach((product) => {
      reviewsArray.push(product.reviews)
    })
    return response.send(reviewsArray);
  })
});

router.post('/products', (request, response) => {
  let requestedProduct = request.body;
  if(requestedProduct.category !== '' && requestedProduct.name !== '' && requestedProduct.price >= 0 && requestedProduct.image !== ''){
    let newProduct = new Product(requestedProduct);
    newProduct.save();
    response.send(newProduct);
  } else {
    response.status(400).send('Invalid product entry')
  }
});

router.post('/:product/reviews', (request, response) =>{
  let requestedProduct = request.product;
  let newReview = new Review({
    userName: request.body.userName,
    text: request.body.text,
    product: request.product._id
  });
  if(newReview.userName && newReview.userName !== '' && newReview.text && newReview.text !== ''){
    request.product.reviews.push(newReview);
    request.product.save();
    return response.send(request.product);
  } else {
    response.send("Incomplete Review");
  }
});

router.delete('/products/:product', (request, response) => {
  request.product.remove();
  response.send("Product Removed");
})

router.delete('/reviews/:review', (request, response) => {
  let requestedReview = request.params.review
  Product.remove({ reviews: { $elemMatch: { _id: requestedReview } } }, (err, doc) => {
    if (err) throw err;
    if (!doc.n == 0) {
      response.send('review deleted');
    } else {
      response.status(400).send("review does not exist");
    }
  })
});








module.exports = router
const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

//Generate fake products
router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    product.reviews = []
    for (let j = 1; j < 3; j++) {
      let review = new Review() 
      

      review.username = faker.name.firstName()
      review.text = faker.lorem.sentences()
      review.product = product._id

      review.save((err) => {
        if (err) throw err
      })
      product.reviews.push(review._id)
    };
    product.save((err) => {
      if (err) throw err
    })
  };
  res.end()
});

// Pagination GET route
router.get('/products', (request, response, next) => {
	const itemsPerPage = 9;
  const pageNumber = request.query.page || 1;
  const categoryTheClientSent = request.query.category ;
  const priceOrderTheClientSent = request.query.price;
  const searchQuery = {};
  const sortQuery = {};
  
  if(categoryTheClientSent !== undefined) {
    searchQuery.category = categoryTheClientSent;
  }
  if(priceOrderTheClientSent!== undefined) {
    if(priceOrderTheClientSent == "lowest") {
      sortQuery.price = 'asc'
    }
    else if (priceOrderTheClientSent == "highest") {
      sortQuery.price = "desc"
    }
  }
  let pageSkip = ((pageNumber * itemsPerPage) - itemsPerPage);
  Product.find(searchQuery).sort(sortQuery).skip(pageSkip).limit(itemsPerPage).exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
		Product.count().exec((err, count) => {
      if (err) throw err;
      response.send(products);
      
		})
	});
});
  // GET route for /products/:productId (Returns a specific product by its id)
router.get('/products/:productId', (request, response) => {
	const {productId}  = request.params;
	Product.findOne({_id: productId}).exec((err, data) => {
		if (err) throw err;
		response.send(data);
	});
});
// GET route for /reviews:
router.get('/reviews', (request, response, next) => {
	Review.find().exec((err, data) => {
		if (err) throw err;
		response.send(data);
	});
});

router.post("/products", (request, response) => {
  const { category, name, price } = request.body.data 
  //using Product schema to create a new document in MONGODB
  let product = new Product()
  product.category = category
  product.name = name
  product.price = price
  product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
  product.reviews = []
  product.save((err) => {
    if (err) throw err
    return response.send(product);
  })
  //response confirms the product was posted. 
  
});

router.post("/:product/reviews", (request, response) => {
  const {product}  = request.params;

  const { username, text } = request.body.data 
  //using Review schema to create a new document in MONGODB
  let review = new Review()
  review.username = username
  review.text = text
  review.product = product
  review.save((err) => {
    if (err) throw err
  })
	Product.findOne({_id: product}).exec((err, foundProduct) => {
    if (err) throw err;
    foundProduct.reviews.push(review._id)
    foundProduct.save((err, savedProduct) => {
      if (err) throw err
      // console.log(savedProduct)  
      //response confirms the product was posted. 
      return response.send(review);
    })
  });

});

// GET route for /products/:productId (Returns a specific product by its id)
router.delete('/products/:productId', (request, response) => {
  const {productId}  = request.params;
  Product.findOne({_id: productId}).remove().exec((err, data) => {
    if (err) throw err;
    response.send(data);
  });
});
//this route deletes the review doc from reviews collection, but not the review in the review array in the product. 
router.delete("/reviews/:reviewId", (request, response) => {
  const {reviewId}  = request.params;
  console.log(reviewId);
  Review.findOne({_id: reviewId}).remove().exec((err, data) => {
    if (err) throw err;
    response.send(data);
  });
});



module.exports = router
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
	let pageSkip = ((pageNumber * itemsPerPage) - itemsPerPage);
	Product.find().skip(pageSkip).limit(itemsPerPage).exec((err, products) => {
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
	Product.find({_id: productId}).exec((err, data) => {
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

// router.post("/products", (request, response) => {
//   const { product } = request.params;
//   // const product = goals.find(goal => goal.id == goalId);
// //add the new product to the product document using save();
//   user.acceptedGoals.push(goal);
//   saveCurrentUser(user);
//   return response.end();
// });
module.exports = router
const router = require('express').Router();
const Product = require('../models/product');
const Review = require('../models/review');

/** get the correct product based on client supplied product ID
(for use in following routes)*/
router.param('product', (request, response, next, id) => {
	Product.find({ _id: id }, (err, product) => {
	  if (err) {
		response.status(404).send('Product was not found');
	  }
	  request.product = product;
	  next();
	});
});

  /** Pagination GET route
  (Returns all products, limit to 9 products per page for pagination)
  TODO: 
  	allow for query params */ 
router.get('/products', (request, response, next) => {
	const itemsPerPage = 9;
	const pageNumber = request.query.page || 1;
	let pageSkip = ((pageNumber * itemsPerPage) - itemsPerPage);
	Product.find().skip(pageSkip).limit(itemsPerPage).exec((err, products) => {
		if (err) throw err;
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
		Product.count().exec((err, count) => {
			if (err) throw err;
			response.send(products);
		})
	});
  });

  /** GET route for /products/:product 
(Returns a specific product by its id)*/
router.get('/products/:product', (request, response) => {
	response.send(request.product);
});

/** POST route for /products 
(Creates a new product in the database)*/
router.post('/products', (request, response) => {
	const addProduct = new Product({
		category: request.body.category,
		name: request.body.name,
		price: request.body.price,
		image: request.body.image,
		reviews: []
	  });
	  addProduct.save();
	  response.send(addProduct);
});

/** POST route for /products/:product/reviews 
(Creates a new review in the database by adding it to the correct product's reviews array)*/
router.post('/products/:product/reviews', (request, response) => {
	const newReview = new Review({
	  username: request.body.username,
	  text: request.body.text,
	  product: request.product[0]
	});
	newReview.save();
	request.product[0].reviews.push(newReview);
	request.product[0].save();
	response.send(newReview);
  });

/** DELETE route for /products/:product
(Deletes a product and the reviews associated with that product
	 from their respective collections based on the client supplied product ID) */
router.delete('/products/:product', (request, response) => {
	Product.findOneAndDelete({ _id: request.product[0]._id }, (err, product) => {
		if (err) throw err;
		product.reviews.forEach((review) => {
			Review.findOneAndDelete({ _id: review._id }, (err) => {
				if (err) throw err;
			});
		});
		response.send('Successfully deleted product and reviews associated with that product');
	});
});

  module.exports = router;
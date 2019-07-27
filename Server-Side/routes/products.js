const router = require('express').Router();
const Product = require('../models/product');
const Review = require('../models/review');
const queryString = require('querystring');
const url = require('url');

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
  (Returns all products, limit to 9 products per page for pagination) */ 
router.get('/products', (request, response) => {
	const parsedURL = url.parse(request.originalUrl);
	let { page, category, price } = queryString.parse(parsedURL.query);
	// sets the sorting order for price parameter
	let sortOrder = price === 'lowest' ? 1 : -1;
	// if page is not defined, default to page 1
	if (typeof page === 'undefined') {
		page = 1
	} else {
		page = Number(page);
	}
	Product.paginate({}, { page, limit: 9 }, (err, products) => {
		if (err) throw err;
		/** If category and price are both defined by client, return all products matching 
			the category and also sort them by either highest or lowest according to price filter. */
		if (category && category !== "" && price && price !== "") {
			Product.paginate({ category }, { page, limit: 9, sort: {price: sortOrder}}, (err, products) => {
				if (err) throw err;
				// Checks if the page number supplied is valid
				if (!page || page < 1 || page > products.pages) {
					response.status(404).send('Page not found.');
				} else {
					products.total === 0 ?
					response.status(404).send('No products for that category found.') :
					response.send(products);
				}
			});	
		}
		/** If category is the only parameter defined by client, return all products
			matching the category. */
		else if (category && category !== "") {
				Product.paginate({ category }, { page, limit: 9 }, (err, products) => {
					if (err) throw err;
					// Checks if the page number supplied is valid
					if (!page || page < 1 || page > products.pages) {
						response.status(404).send('Page not found.');
					} else {
						products.total === 0 ?
						response.status(404).send('No products for that category found.') :
						response.send(products);
					}
				});
			}
		/** If price is the only parameter defined by client, return all products
			sorted by either highest or lowest according to price filter. */
		else if (price && price !== "") {
				Product.paginate({}, { page, limit: 9, sort: {price: sortOrder}}, (err, products) => {
					if (err) throw err;
					// Checks if the page number supplied is valid
					if (!page || page < 1 || page > products.pages) {
						response.status(404).send('Page not found.');
					} else {
						products.total === 0 ?
						response.status(404).send('No products found.') :
						response.send(products);
					}
				});
			} else {
				response.send(products);
			}
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
/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { faker } = require('@faker-js/faker');
const Product = require('../models/product');

router.get('/generate-fake-data', (req, res, next) => {
	for (let i = 0; i < 90; i++) {
		let product = new Product();

		product.category = faker.commerce.department();
		product.name = faker.commerce.productName();
		product.price = faker.commerce.price();
		product.image = 'https://via.placeholder.com/250?text=Product+Image';

		product.save((err) => {
			if (err) throw err;
		});
	}
	res.end();
});

router.get('/products', (req, res, next) => {
	const perPage = 9;

	// return the first page by default
	const page = req.query.page || 1;

	Product.find({})
		.skip(perPage * page - perPage)
		.limit(perPage)
		.exec((err, products) => {
			// Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
			Product.count().exec((err, count) => {
				if (err) return next(err);

				res.send(products);
			});
		});
});

router.get('/products/:product', (req, res, next) => {
	Product.find({ _id: req.params.product }, (err, product) => {
		if (err) {
			res.send(err);
		}
		res.send(product);
	});
});

//still need to implement 'populate reviews' functionality. Pagination needs more testing
router.get('/products/:product/reviews', (req, res, next) => {
	const perPage = 4;
	const page = req.query.page || 1;
	Product.find({ _id: req.params.product }, (err, rev) => {
		if (err) {
			res.send(err);
		}
		const prodRev = rev[0].reviews;
		res.send(prodRev.slice(perPage * page - perPage, perPage * page));
	});
});

router.post('/products', (req, res, next) => {
	const product = new Product();
	product.category = req.body.category;
	product.name = req.body.name;
	product.price = req.body.price;
	product.image = req.body.image;
	product.reviews = [];

	product.save((err) => {
		if (err) {
			res.send(err);
		}
		console.log(product);
		res.send(product);
	});
});




	

module.exports = router;

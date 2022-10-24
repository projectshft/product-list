/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { faker } = require('@faker-js/faker');
const Product = require('../models/product');
const Review = require('../models/review');
//adding this just for commit purposes because last commit had questionable processing

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

router.route('/products').get((req, res, next) => {
	const perPage = 9;
	const page = req.query.page || 1;
	let category = req.query.category;
	let price = req.query.price;
	let search = req.query.query;

	let optionalFilters = () => {
		if (category && search) {
			return {
				category: category,
				$text: { $search: search },
			};
		}
		if (category) {
			return { category: category };
		}
		if (search) {
			return { $text: { $search: search } };
		}
	};

	let priceFilter = () => {
		if (price) {
			if (price == 'highest') {
				return { price: -1 };
			} else if (price == 'lowest') {
				return { price: 1 };
			} else {
				return null;
			}
		}
	};

	let options = {
		sort: priceFilter(),
		offset: perPage * page - perPage,
		limit: perPage,
	};

	Product.paginate(optionalFilters(), options, function (err, products) {
		console.log(products);
		res.send(products);
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
	Product.find({ _id: req.params.product }, (err, prod) => {
		if (err) {
			res.send(err);
		}
		const ProdRev = prod[0].reviews;

		// ProdRev.populate('reviews').exec((err, product) => {
		// 	if (err) {
		// 		res.send(err);
		// 	}
		// 	res.send(product);

		res.send(ProdRev.slice(perPage * page - perPage, perPage * page));
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
		res.send(product);
	});
});

router.post('/products/:product/reviews', (req, res, next) => {
	const review = new Review();
	review.userName = req.body.userName;
	review.text = req.body.text;
	review.product = req.params.product;
	Product.find({ _id: req.params.product }, (err, prod) => {
		if (err) {
			res.send(err);
		}
		const product = prod[0];
		product.reviews.push(review);
		product.save((err) => {
			if (err) {
				res.send(err);
			}
			res.send(review);
		});
	});
});

router.delete('/products/:product', (req, res, next) => {
	Product.findOneAndRemove({ _id: req.params.product }, (err, product) => {
		if (err) {
			res.send(err);
		}
		res.send(product);
	});
});

router.delete('/reviews/:review', (req, res, next) => {
	Review.findOneAndRemove({ _id: req.params.review }, (err, review) => {
		if (err) {
			res.send(err);
		}
		Product.find({ _id: review.product }, (err, prod) => {
			if (err) {
				res.send(err);
			}
			const product = prod[0];
			const index = product.reviews.indexOf(review._id);
			product.reviews.splice(index, 1);
			product.save((err) => {
				if (err) {
					res.send(err);
				}
				res.send(review);
			});
		});
	});
});

module.exports = router;

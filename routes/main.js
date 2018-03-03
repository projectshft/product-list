const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')

router.get('/generate-fake-data', (req, res) => {
	for (let i = 0; i < 90; i++) {
		let product = new Product()
		let review = {}
		product.category = faker.commerce.department()
		product.name = faker.commerce.productName()
		product.price = faker.commerce.price()
		product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
		product.reviews = []
		review.userName = faker.name.findName()
		review.text = faker.random.words(4)
		review.product = product
		product.reviews.push(review)
		product.save((err) => {
			if (err) throw err
		})
	}
	res.end()
})

router.get('/products', (req, res) => {
	let categoryFilter = {}
	if (req.query.category) {
		categoryFilter = { category: req.query.category }
	}

	let sortFilter = {}
	if (req.query.price == 'highest') {
		sortFilter = { price: -1}
	} else if (req.query.price == 'lowest') {
		sortFilter = { price: 'asc'}
	}

	let pageFilter = 0
	let pageRequested = parseInt(req.query.page)
	if (pageRequested) {
		pageFilter = (pageRequested - 1) * 10
	}

	Product.find(categoryFilter).sort(sortFilter).skip(pageFilter).limit(9).exec((err, data) => {
		res.send(data)
	})
})

router.get('/products/:product', (req, res) => {
	Product.findById(req.params.product).exec((err, data) => {
		res.send(data)
	})
})

router.get('/reviews', (req, res) => {
	let reviews = []
	let pageFilter = 0
	let pageRequested = parseInt(req.query.page)

	if (pageRequested) {
		pageFilter = (pageRequested - 1) * 10
	}

	Product.find().skip(pageFilter).limit(40).exec((err, data) => {
		for (let i = 0; i < data.length; i++) { 
			//I should update this with a concat method to catch multiple reviews per product.
			reviews.push(data[i].reviews[0])
		}
		res.send(reviews)
	})
})

router.post('/products', (req, res) => {
	let newProduct = new Product()
	let productDetails = req.body

	newProduct.category = productDetails.category
	newProduct.image = productDetails.image
	newProduct.name = productDetails.name
	newProduct.price = productDetails.price

	newProduct.save((err) => {
		if (err) throw err
	})
	res.send(newProduct)
})

router.post('/:products/reviews', (req, res) => {
	let newReview = {}
	newReview.userName = req.body.userName
	newReview.text = req.body.text
	Product.findById(req.params.products).exec((err, product) => {
		if (err) throw err
		newReview.product = product
		product.reviews.push(newReview)
		product.save((err) => {
			if (err) throw err
		})
		//If I try to send back the product, I get a call stack error. 
		// but with a string it works fine. Weird.
		res.send('Review saved.') 
	})
})

router.delete('/products/:product', (req, res) => {
	Product.findByIdAndRemove(req.params.product, (err, data) => {
		if (err) {
			res.send(err)
		} else {
			res.send(data)
		}
	})	
})

router.delete('/reviews/:review', (req, res) => {
	Product.find( {'reviews': {$elemMatch: {'_id': req.params.review}}}).exec( (err, data) => {
		data[0].reviews.id(req.params.review).remove()
		data[0].save( (err) => {
			if (err) {
				res.send(err)
			} else {
				res.send('Review removed.')
			}
		})
	})
})

module.exports = router
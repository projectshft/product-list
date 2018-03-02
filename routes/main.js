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
	let itemsToSkip = 0
	let pageRequested = parseInt(req.query.page)
	if (pageRequested) { itemsToSkip = (pageRequested - 1) * 10 }
  
	Product.find().skip(itemsToSkip).limit(10).exec((err, data) => {
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
	let itemsToSkip = 0
	let pageRequested = parseInt(req.query.page)

	if (pageRequested) { itemsToSkip = (pageRequested - 1) * 10 }

	Product.find().skip(itemsToSkip).limit(40).exec((err, data) => {
		for (let i = 0; i < data.length; i++) { 
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
// POST /: products / reviews: Creates a new review in the database by adding it to the correct product's reviews array.
})

router.delete('/products/product:', (req, res) => {
// DELETE / products /: product: Deletes a product by id
})

router.delete('/reviews/:review', (req, res) => {
// DELETE / reviews /: review: Deletes a review by id
})




module.exports = router
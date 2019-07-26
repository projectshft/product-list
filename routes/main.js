const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

/** Create some fake data
(Creates 90 new products and 4 reviews for each "product reviews" array) */
router.get('/generate-fake-data', (request, response, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
	product.reviews = [];
	// adding fake reviews here to work with later
	for (let j = 0; j < 4; j++) {
		let review = new Review({
			username: faker.internet.userName(),
			text: faker.lorem.sentences(2),
			product: product
		});

		review.save((err) => {
			if (err) throw err;
		});
		product.reviews.push(review);
	}
    product.save((err) => {
      if (err) throw err
    })
  }
  response.end()
})

module.exports = router;
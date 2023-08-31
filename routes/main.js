const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')

router.get('/generate-fake-data', async (req, res, next) => {
    try {
        for (let i = 0; i < 90; i++) {
            const product = new Product({
                category: faker.commerce.department(),
                name: faker.commerce.productName(),
                price: faker.commerce.price(),
                image: 'https://via.placeholder.com/250?text=Product+Image',
            })

            await product.save()
        }
        res.end()
    } catch (error) {
        next(error)
    }
})

// Pagination: 9 products per page
// We'll want to be able to pass in an optional query to return only the products of the passed in category.
// The url will look like this: localhost:8000/products?page=1&category=tools

// We'll want to be able to pass in another optional query to return the products, but sorted by price -
// either from highest to lowest, or vice versa.
//The url will look like this:localhost:8000/products?page=1&category=tools&price=highest

// We'll want to be able to pass in another optional query to return the products that match a certain string.
// For simplicity sake, the string should only need to occur within the product itself (not the reviews).
// The url could look like this: localhost:8000/products?query=shovel
router.get('/products', async (req, res) => {
    const perPage = 9
    const page = parseInt(req.query.page) || 1
    const category = req.query.category
    const sortByPrice = req.query.price
    const searchQuery = req.query.query

    let query = {}

    if (category) {
        query.category = category
    }

    if (searchQuery) {
        query.$or = [{ name: searchQuery }, { category: searchQuery }]
    }

    let countQuery = Product.countDocuments(query) // Count total matching products

    if (sortByPrice === 'highest') {
        countQuery = countQuery.sort({ price: -1 })
    } else if (sortByPrice === 'lowest') {
        countQuery = countQuery.sort({ price: 1 })
    }

    const totalProducts = await countQuery.exec()

    const totalPages = Math.ceil(totalProducts / perPage)

    let productsQuery = Product.find(query)

    if (sortByPrice === 'highest') {
        productsQuery = productsQuery.sort({ price: -1 })
    } else if (sortByPrice === 'lowest') {
        productsQuery = productsQuery.sort({ price: 1 })
    }

    const products = await productsQuery
        .skip(perPage * (page - 1))
        .limit(perPage)
        .exec()

    res.status(200).send({
        products,
        totalPages,
        currentPage: page,
    })
})

//GET /products/:product: Returns a specific product by its id
router.get('/products/:product', (req, res) => {
    const productInReq = Product.findById(req.params.product) //Find the product by the product ID in the request
    if (!productInReq) {
        res.status(404).send({ error: 'No product found' }) // Return an error is the variable is empty
    } else {
        res.status(200).send(productInReq) // Send the product if its found
    }
})

// GET /products/:product/reviews: Returns ALL the reviews for a product, but limited to 4 at a time.
// This one will be a little tricky as you'll have to retrieve them out of the products.
// You should be able to pass in an optional page query parameter to paginate.
router.get('/products/:product/reviews', (req, res) => {
    // return the first page by default
    const page = req.query.page || 1

    const productInReq = Product.findById(req.params.product) //Find the product by the product ID in the request
    if (!productInReq) {
        res.status(404).send({ error: 'No product found' }) // Return an error is the variable is empty
    } else {
        const reviews = productInReq.reviews
            .find({})
            .skip(4 * page - 4)
            .limit(4)
            .exec()

        res.status(200).send(reviews)
    }
})

// POST /products: Creates a new product in the database
router.post('/products', (req, res) => {
    const { category, name, price, image, reviews } = req.body

    if (!category || !name || !price || !image) {
        return res.status(400).send({ error: 'Missing required fields' })
    } else {
        const product = new Product({
            // Make the new product
            category,
            name,
            price,
            image,
            reviews: reviews || [], // Pass reviews as an array or leave it empty
        })

        product.save() // Save the new product to the collection

        res.status(200).send(product)
    }
})

// POST /products/:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.
router.post('/products/:products/reviews', (req, res) => {
    const productInReq = Product.findById(req.params.product) //Find the product by the product ID in the request
    const { username, text } = req.body // Get the review content

    // Make sure a review is actually there
    if (!username || !text) {
        return res
            .status(400)
            .send({ error: 'Username and text are required for the review' })
    } else if (!productInReq) {
        return res.status(400).send({ error: 'Product not found' })
    } else {
        const newReview = new reviews({
            username,
            text,
            product: productId, // Associate the review with the product
        })
        newReview.save() // Save the new review

        productInReq.reviews.push(newReview._id)
        productInReq.save() // Add the new review to the product

        res.status(200).send(newReview) //Send success code and new review
    }
})

// DELETE /products/:product: Deletes a product by id
router.delete('/products/:product', (req, res) => {
    const deletedProduct = Product.findByIdAndDelete(req.params.product) // Find the product and delete it

    if (!deletedProduct) {
        return res.status(400).send({ error: 'Product not found' })
    } else {
        res.status(200)
    }
})

//DELETE /reviews/:review: Deletes a review by id
router.delete('/reviews/:review', (req, res) => {
    const deletedReview = Review.findByIdAndDelete(req.params.review) //Find the review and delete it

    if (!deletedReview) {
        return res.status(400).send({ error: 'Review not found' })
    } else {
        res.status(200)
    }
})
module.exports = router

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema ({
    userName: String, 
    text: String
})

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [ReviewSchema]
})

module.exports = mongoose.model('Review', ReviewSchema);

module.exports = mongoose.model('Product', ProductSchema)

// GET /products/:product: Returns a specific product by its id

// GET /reviews: Returns ALL the reviews, but limited to 40 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an options page query to paginate.

// POST /products: Creates a new product in the database

// POST /:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.

// DELETE /products/:product: Deletes a product by id

// DELETE /reviews/:review: Deletes a review by id
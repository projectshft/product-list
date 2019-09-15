GET /products/:product: Returns a specific product by it's id

GET /reviews: Returns ALL the reviews, but limited to 40 at a time. An options page query to paginate.

POST /products: Creates a new product in the database

POST /:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.

DELETE /products/:product: Deletes a product by id

DELETE /reviews/:review: Deletes a review by id

No PUT.

GET /products
Able to pass in an optional query to return only the products of the passed-in category. The url will look like this:

localhost:8000/products?page=1&category=tools

Able to pass in another optional query to return the products, but sorted by price - highest to lowest, or lowest to highest.

The url will look like this:

localhost:8000/products?page=1&category=tools&price=highest

or

localhost:8000/products?page=1&category=tools&price=lowest

Category, or any other query, may be excluded; they're all optional:

localhost:8000/products?page=1&price=lowest

This is another example:

localhost:8000/products?price=lowest

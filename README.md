## Product List

This project has been created by a student at Project Shift, a software engineering fellowship located in Downtown Durham. The work in this repository is wholly of the student based on a sample starter project that can be accessed by looking at the repository that this project forks.

If you have any questions about this project or the program in general, visit projectshift.io or email hello@projectshift.io.

---

Assignment Details

---

Build the API: Create the following routes:

GET /products/:product: Returns a specific product by it's id

GET /reviews: Returns ALL the reviews, but limited to 40 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an options page query to paginate.

POST /products: Creates a new product in the database

POST /:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.

DELETE /products/:product: Deletes a product by id

DELETE /reviews/:review: Deletes a review by id

No PUT for now.

Individual Exercise 2 - Filter Category
Next, we'll want to update the following route:

GET /products
We'll want to be able to pass in an optional query to return only the products of the passed in category. The url will look like this:

localhost:8000/products?page=1&category=tools

Individual Exercise 3 - Sorting
Also for the same route:

GET /products
We'll want to be able to pass in another optional query to return the products, but sorted by price - either from highest to lowest, or vice versa.

The url will look like this:

localhost:8000/products?page=1&category=tools&price=highest

or

localhost:8000/products?page=1&category=tools&price=lowest

Also, it may exclude category or any other query, since they're all optional:

localhost:8000/products?page=1&price=lowest

This is another example.

localhost:8000/products?price=lowest

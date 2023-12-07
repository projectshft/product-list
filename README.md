## Product List

This is an API built for an evaluation for [Parsity Coding School](https://parsity.io/). The API is built for a mock e-commerce store that sells various "products" -- each product is randomly generated using [Faker](https://fakerjs.dev/), so that's why you will find products such as "Handcrafted Wooden Computer" in the "Jewelry" category.

This project was built with TypeScript, Node.js, Express, and MongoDB.

### Run Locally

1. To run locally, you will need to set up a MongoDB database on your computer. This project was created with MongoDB 5.0, but it should be compatible with later versions as well. Follow [this link](https://www.mongodb.com/docs/manual/installation/) for installation instructions on your operating system of choice. Ensure that as a part of your installation, you specify a data directory. Test that your database is working using the [MongoDB Shell](https://www.mongodb.com/docs/mongodb-shell/). Once you know the database is set up correctly, move on to the next step.

2. Fork and clone this repo.

3. `cd` into the repo on your local computer, then `npm install` to install dependencies.

4. `npm start` to launch the development server on `localhost:8000`.

5. Copy and paste the contents of `swagger/swagger.yaml` into the [Swagger Editor](https://editor.swagger.io/). This is the documentation for the API routes.

For testing `GET` routes, you can simply type the URL into your web browser -- for example, `localhost:8000/products`. For `POST` and `DELETE` routes, you will need to use a CLI tool like [curl](https://en.wikipedia.org/wiki/CURL) or [download the desktop agent for Postman](https://www.postman.com/downloads/).

## Product List

### About the Backend

This is an API built for an evaluation for [Parsity Coding School](https://parsity.io/). The API is built for a mock e-commerce store that sells various "products" -- each product is randomly generated using [Faker](https://fakerjs.dev/).

This project was built with TypeScript, Node.js, Express, and MongoDB.

### About the Frontend

The frontend for this project was built using React. It displays an e-commerce storefront that allows the user to view all the products upon first load and then filter results by category, price, and a custom search query.

### Run API Locally

1. To run locally, you will need to set up a MongoDB database on your computer. This project was created with MongoDB 5.0, but it should be compatible with later versions as well. Follow [this link](https://www.mongodb.com/docs/manual/installation/) for installation instructions on your operating system of choice. Ensure that as a part of your installation, you specify a data directory. Test that your database is working using the [MongoDB Shell](https://www.mongodb.com/docs/mongodb-shell/). Once you know the database is set up correctly, move on to the next step.

2. Fork and clone this repo.

3. `cd` into the repo on your local computer, then `cd` into `backend` and `npm install` to install dependencies.

4. `npm start` to launch the development server on `localhost:8000`.

5. Copy and paste the contents of `swagger/swagger.yaml` into the [Swagger Editor](https://editor.swagger.io/). This is the documentation for the API routes.

IMPORTANT: Before you are able to use any of the routes, you will need to generate fake data. You can do so by navigating first to `localhost:8000/generate-fake-data` then to `localhost:8000/generate-fake-reviews`.

For testing `GET` routes, you can simply type the URL into your web browser -- for example, `localhost:8000/products`. For `POST` and `DELETE` routes, you will need to use a CLI tool like [curl](https://en.wikipedia.org/wiki/CURL) or [download the desktop agent for Postman](https://www.postman.com/downloads/).

### Run the Frontend Locally

1. To run the frontend, first ensure that you have followed the previous steps to get the API working. Launch the API by `cd`ing into the `backend` folder and running `npm start`.

2. Once the server is running, `cd` into the `frontend` folder and launch the frontend server by running `npm run dev`. 

3. Navigate to `localhost:5173` in your browser. If everything was set up correctly, you should be able to interact with your product data with the UI.
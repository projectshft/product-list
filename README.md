# Product List

This project is a full-stack e-commerce site built using MongoDB, Node.js, React, and Redux.

## Data

The data was generated using [faker](https://fakerjs.dev/) and is stored locally using MongoDB Community

## Server

The following routes are supported:

```
GET /products
GET /products/count
GET /products/:productId
GET /products/:productId/reviews
POST /products
POST /products/:productId/reviews
DELETE /products/:productId
DELETE /reviews/:reviewId
```

## Frontend

The frontend currently supports the /products route, which includes options for filtering, sorting, and searching products.

## Getting Started

### Prerequisites

- Node.js (version 14 or above)
- npm
- MongoDB Community Edition - follow installation guidelines for your system [here](https://www.mongodb.com/docs/manual/administration/install-community/#std-label-install-mdb-community-edition)
- MongoDB Compass GUI - follow download instructions [here](https://www.mongodb.com/docs/compass/current/install/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/acl13/product-list.git
   cd product-list
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Starting the Server & Populating Data

Start the server and connect to MongoDB

```bash
 node server.js
```

- Ensure connection string in server.js matches the connection string in MongoDB Compass
- Navigate to localhost:8000/generate-fake-data to populate the database
  (This will add 90 random products to the database - it is recommended to only complete this step once or twice)
- Use MongoDB Compass to check that your data is populating correctly

### Displaying Frontend

While the server is running, open a separate command line tab and run the following code to view the frontend

```bash
 cd frontend/product-list
 npm run build
 npm run start
```

Navigate to http://localhost:3000 to view in browser

---

This project has been created by a student at Parsity, an online software engineering course. The work in this repository is wholly of the student based on a sample starter project that can be accessed by looking at the repository that this project forks.

If you have any questions about this project or the program in general, visit [parsity.io](https://parsity.io/) or email hello@parsity.io.

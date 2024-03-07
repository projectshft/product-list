# Product Inventory App

This is a simple web application that allows users to browse and filter through a list of products fetched from a MongoDB database. The backend is built with Express.js to handle API requests and interact with the MongoDB database, while the frontend is developed using React.js for a dynamic user interface.

## Features

- Fetches a list of products from the backend.
- Displays products in a paginated list on the frontend.
- Users can filter products by category.
- Users can sort products by price.
- Users can search for products by name.

## Technologies Used

- React.js
- MongoDB
- Express.js

## Installation

1. Clone this repository to your local machine:

```
git clone https://github.com/AdamC7313/product-list.git
```

2. Navigate to the project directory:

```
cd product-list
```

3. Install dependencies for both backend and front end:

```
npm install

cd product-list-ui
npm install
```

## Usage

1. Start the backend server (make sure you are in the root folder):

```
server node.js
```

2. Start the NextJS dev server:

```
cd product-list-ui
npm run dev
```

3. Open your web browser and navigate to 'http://localhost:3000' to view the application

## Backend API Endpoints

- '**GET /products/:product**': Returns a specific product by its id
- '**GET /products/:product/reviews**': Returns ALL the reviews for a product, but limited to 4 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an optional page query parameter to paginate.
- '**POST /products**': Creates a new product in the database
- '**POST /products/:product/reviews**': Creates a new review in the database by adding it to the correct product's reviews array.
- '**DELETE /products/:product**': Deletes a product by id
- '**DELETE /reviews/:review**': Deletes a review by id

## Directory Structure
```
product-list/
├── models/                    # MongoDB models
├── routes/                    # Express routes
├── test/                      # Server test file
└── server.js                  # Express server setup
└── product-list-ui/           # Frontend NextJS code
    ├── app/                   # Main application files
        └── layout.js
        └── page.js
    ├── components/            # Building blocks to main app
        └── ProductList.js
        └── ProductListItem.js          
    ├── public/
    ├── package.json
```

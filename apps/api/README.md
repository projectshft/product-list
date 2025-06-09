# Product List API

A RESTful API for managing products and reviews, built with Express.js, TypeScript, and MongoDB. This API provides endpoints for product management, review system, and data generation using TSOA for automatic route generation and OpenAPI documentation.

## Features

- **Product Management**: CRUD operations for products
- **Review System**: Create and manage product reviews
- **Data Generation**: Generate sample products and reviews using Faker.js
- **Auto-generated Documentation**: Swagger/OpenAPI documentation
- **Type Safety**: Full TypeScript implementation with Zod validation
- **CORS Support**: Cross-origin resource sharing enabled

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database with Mongoose ODM
- **TSOA** - Auto-generated routes and OpenAPI specs
- **Faker.js** - Sample data generation
- **Swagger UI** - API documentation interface

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Database Setup

Ensure MongoDB is running locally on the default port (27017).

## API Documentation

Interactive API documentation is available at:
```
http://localhost:3000/docs
```

## API Endpoints

### Products

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/products` | Get all products | `page`, `limit`, `category`, `price`, `query` |
| GET | `/products/{id}` | Get product by ID | - |
| POST | `/products` | Create new product | - |
| DELETE | `/products/{id}` | Delete product | - |

**Product Query Parameters:**
- `page` - Page number for pagination
- `limit` - Number of items per page
- `category` - Filter by product category
- `price` - Sort by price (`highest` or `lowest`)
- `query` - Search products by name

**Product Schema:**
```json
{
  "name": "string",
  "category": "string", 
  "price": "number",
  "image": "string (URL)"
}
```

### Reviews

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/reviews/{productId}` | Get reviews for product | `page`, `limit` |
| POST | `/reviews` | Create new review | - |
| DELETE | `/reviews/{id}` | Delete review | - |

**Review Schema:**
```json
{
  "text": "string",
  "rating": "number (1-5)",
  "productId": "string"
}
```

### Data Generation

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/generate` | Generate sample products and reviews | 

### Project Structure

```
src/
├── errors/           # Error handling and types
├── generate/         # Data generation endpoints
├── products/         # Product-related endpoints
│   ├── productModel.ts
│   ├── productsController.ts
│   ├── productsService.ts
│   └── productTypes.ts
├── reviews/          # Review-related endpoints
│   ├── reviewModel.ts
│   ├── reviewsController.ts
│   ├── reviewsService.ts
│   └── reviewTypes.ts
├── app.ts           # Express app configuration
└── server.ts        # Server entry point
```
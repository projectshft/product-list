# Product List

## Description

This project is intended to run on a Node.js server to provide a fictitious e-commerce site using Express and MongoDB.

## Getting Started

To start the backend, `cd backend/` > `npm install` > `npm run start`. The backend runs at http://localhost:8000.

To start the frontend, `cd frontend/` > `npm install` > `npm run dev`. The frontend runs at http://localhost:3000.

This assumes MongoDB is already installed and running on the default port. 
https://www.mongodb.com/docs/manual/administration/install-community/

## Generating Fake Data
Once the backend is running, you can generate fake data by sending a GET request to: 
http://localhost:8000/get-fake-data

## Testing

There are automated tests using mocha and chai to help ensure server functionality remains consistent as changes are made. To run the tests, make sure your terminal is in the 'backend/' directory and run 'npm run test'.

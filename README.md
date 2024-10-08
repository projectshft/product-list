FE+BE Product List Hackathon Project
This is my product list with full back end and front end implementation, and you will need several programs and dependencies to run these properly.

1. This Project is run

## Installation

1. Clone the repository:

   git clone https://github.com/lesavantdon/product-list.git
   CD to FE+BE
   CD FE "npm start" to run front end
   CD BE "npm start" to run back end
   make sure data is seeded into the mongo database with "BE git:(master) ✗ node scripts/seed.js" in shell

   ```

   ```

## Dependencies

### Front-End

"scripts": {
"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test",
"eject": "react-scripts eject",
"install:legacy": "npm install --legacy-peer-deps"
},
"dependencies": {
"@redux-devtools/extension": "^3.3.0",
"@reduxjs/toolkit": "^2.2.7",
"axios": "^1.7.7",
"bootstrap": "^5.3.3",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-redux": "^9.1.2",
"react-router-dom": "^6.16.0",
"redux": "^5.0.1",
"redux-thunk": "^3.1.0"
},
"devDependencies": {
"react-scripts": "^5.0.1"
},
"eslintConfig": {
"extends": [
"react-app",
"react-app/jest"
]
},

### Back-End

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "node server.js"
},

"homepage": "https://github.com/lesavantdon/product-list#readme",
"dependencies": {
"cors": "^2.8.5",
"express": "^4.19.2",
"mongoose": "^8.5.3"
}

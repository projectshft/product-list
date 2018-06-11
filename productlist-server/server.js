// Required Packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Global Variables (api key should be in more secure place)
const VALID_API_KEYS = ["88312679-04c9-4351-85ce-3ed75293b449","1a5c45d3-8ce7-44da-9e78-02fb3c1a71b7"];
const CORS_HEADERS = {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, X-Authentication"};
const PORT = 8000;


// Routes that the server can take. Please read their usage in the /routes folder.
// Generate Fake Data:
// GET[/generate-fake-data]
const fakeData = require('./routes/fakeData'); 

// All products related route:  
// GET[/products],[/products/:productId]
// POST[/products]
// DELETE[/products/:product]
const productsRouter = require('./routes/productsRouter'); 

// All reviews related route:
// GET[/reviews]
// POST[/:product/reviews]
// DELETE[/reviews/:review]
const reviewsRouter = require('./routes/reviewsRouter');

// Connecting server with database.
mongoose.connect('mongodb://localhost/products');
// Creating express server
const app = express();

// For practice purpose, this route doesn't need go through preprocessing, since it doesn't directly affect client side.
// This doesn't happen in real world situation, only for testing anyway.
app.use(fakeData); // Generate Fake Data   GET /generate-fake-data

// ======================================= Preprocessing Requests & Responses ============================================ //
// Setting CORS header
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Authentication");
    response.header("Access-Control-Allow-Origin", "*");
    
    // Pre-flight Request
    if ('OPTIONS' == request.method) {
        return response.status(200).send();
    }

    next();
});

// Validating API key
app.use(function(request,response,next) {
    if(!VALID_API_KEYS.includes(request.headers['x-authentication'])){
        return response.status(401).send("Unauthorized API key");
    }
    next();
});

// Body Parser config to parse requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// =================================== End of Preprocessing Requests & Responses ============================================ //

// ==================================================== Routes ============================================================== //

// Suppose to have different routers working on different routes, but... not using population, so they are intertwined.
// Products Handler 
app.use(productsRouter);

// Reviews Handler
app.use(reviewsRouter);

// ================================================== End of Routes ========================================================== //

// =============================== =================== Server Port ============================================================ //
app.listen(PORT, () => {
  console.log('Node.js listening on port ' + PORT)
})
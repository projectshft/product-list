const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const ReviewSchema = require('../models/review')
const Review = mongoose.model("Review", ReviewSchema);

//=======================================================//
// Middleware router.param used to validate productId
//=======================================================//

// Middleware to verify param 'productId' is valid mongoose ObjectId Type.
// Without this, there will be cast type error when productID is invalid.
router.param('productId', function(request, response, next, productId) {
  if (mongoose.Types.ObjectId.isValid(productId)) {
    // assigning mongoose object query (product) to request.product.
    request.product = Product.findById(productId);
    next();
  } else { // Else if not a valid mongoose ObjectId Type.
    return response.status(400).send("Not a valid mongoose ObjectId Type.")
  }
});

//====================== End of Middleware =====================//

//========================== Router handler for different API request method related to Product(s) ===============================//

// Returns all products, 9 at a time, can query by page/price sorting/category
router.get('/products', (request, response, next) => {
    const perPage = 9
  
    const page = parseInt(request.query.page) || 1; // return the first page by default
    let sort;
    let query = {
      name: new RegExp(request.query.query, 'i'),
      category: new RegExp(request.query.category, 'i')
    }

    if(page < 0 || page % 1 !== 0){ // checks if page entered if valid.
      return response.status(400).send("Please enter valid positive interger only.")
    }

    if(request.query.price){
      // switch cases to sort, default case not required.
      switch(request.query.price.toLowerCase()){
        case 'highest':
          sort = {price:-1};
          break;
        case 'lowest':
          sort = {price: 1}
          break;
      }
    } 

    Product
      .find(query)
      .sort(sort)
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, products) => {
        if (err){
          return response.status(500).send("Something bad happened.")
        } 
        // throw err // not sure what this does, but client was able to read server's dir?

        // If products is empty or undefined, return 404.
        if(!products || products.length == 0){
          return response.status(404).send("No products found.");
        }
        
        Product.count(query).exec((err, count) => {
          if (err) return next(err)
          let pageCount = Math.ceil(count / perPage);
          return response.send({products: products, pageCount: pageCount});
        })
      })
      
})

// Product ID is verified in the router.param middleware at line 13 of this file.
// This route returns product requested by user using product ID
router.get('/products/:productId', (request, response, next) => {
  request.product.exec((err, product) => {
    if (err) throw err;
    // If product == null, return 404.
    if(!product){
      return response.status(404).send("No product with that ID found.");
    } else { // else return requested product.
      return response.send(product);
    }
  })
});

// This route allows user to add new product
router.post('/products/', (request, response, next) => {
  // This checks if post request is made correctly.
  // If validated, it will save new product to database.
  if(request.body.category && request.body.name && request.body.price > 0 && request.body.imageUrl){
    let newProduct = new Product();

    newProduct.category = request.body.category;
    newProduct.name = request.body.name;
    newProduct.price = parseFloat(request.body.price).toFixed(2); // parseFloat to make it realistic
    newProduct.image = request.body.imageUrl;

    newProduct.save((err) => {
      if (err) throw err;
      return response.status(200).send(newProduct);
    })
  } else { // if fails, send 400 and error msg.
    return response.status(400).send("POST product request body must have valid category, name, price, and imageUrl");
  } 
});

// This route allows user to remove a product from the database using productId
// findByIdAndRemove returns the model query, therefore allows to be executed.
router.delete('/products/:productId', (request, response, next) => {
  request.product.exec((err, data) => {
    if(err) throw err;
    if(data){
      data.remove();
      return response.status(200).send(`${data.id}, ${data.name} has been successfully removed.`);
    } else {
      return response.status(404).send("Product not found, Unable to process delete.");
    }
  })
});

module.exports = router
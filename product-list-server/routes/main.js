const express = require('express');
const router = require('express').Router();
const faker = require('faker');
const productSchema = require('../models/product')
const Product = require('../models/product');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
//use library to enable cors requests
const cors = require('cors');
const _ = require('lodash');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//generate fake data route - comment out so data is only generated once.
  // router.get('/generate-fake-data', (req, res, next) => {
  //   for (let i = 0; i < 90; i++) {
  //     let product = new Product()

  //     product.category = faker.commerce.department()
  //     product.name = faker.commerce.productName()
  //     product.price = faker.commerce.price()
  //     product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

  //     product.save((err) => {
  //       if (err) throw err
  //     })
  //   }
  //   res.end()
  // })


//I added reviews arrays to the products using the mongo shell's $set function. 

//The function below adds reviews to each product.
  router.get('/add-reviews', (req, res, next) => {
    Product.find( (err, data) => {
      if (err) throw err;
      data.forEach( (product) => {
        let review1 = {
          username: faker.internet.userName(),
          text: faker.random.words(),
          product: product.id,
        };
        let review2 = {
          username: faker.internet.userName(),
          text: faker.random.words(),
          product: product.id,
        };
        let review3 = {
          username: faker.internet.userName(),
          text: faker.random.words(),
          product: product.id,
        }
        product.reviews.push(review1, review2, review3)
        product.save();
      });
      res.send(data);
    });
  });


//function to populate categories list 
router.get('/categories', (req, res, next) => {
  Product.find( (err, data) => {
    if (err) throw err;
    let categories = _.uniq(data.map( (product) => {
      return product.category;
    }));
    res.send(categories)
  })
});

router.get('/products', (req, res, next) => {
  const resultsPerPage = 9;
  let numberToSkip = 0;
  if (req.query.page) {
  //subtract one from requested page, as page 1 means skip 0, and so on...
    numberToSkip = (parseInt(req.query.page) -1) * resultsPerPage;
  }

  //allow user to enter a category in the query
  let search = {};
  if (req.query.category) {
    search.category = req.query.category;
  }

  //allow user to sort by price, highest or lowest first. 
  let priceSort = {};
  if (req.query.price === 'highest') {
    priceSort.price = -1;
  } else if (req.query.price === 'lowest'){
    priceSort.price = 1;
  }

  //add searchTerm to query if present.
  if (req.query.search) {
    search.name = new RegExp(req.query.search, 'i');
  } 

  //get count of all products matching search query, then do search
  
  Product.count(search, (err, count) => {

    Product.find(search)
    .skip(numberToSkip)
    .limit(resultsPerPage)
    .sort(priceSort)
    .exec( (err, products) => {
      if (err) throw err;
      res.send({
        products,
        totalProducts: count
      });
    })
  
  } );

  

});

//GET /products/:product: Returns a specific product by its id
  router.get('/products/:product', (req, res, next) => {
    //check for invalid product Id before querying database.
    if (!mongoose.Types.ObjectId.isValid(req.params.product)){
      return res.status(400).send("Invalid product ID.");
    };

    Product.findById(req.params.product, (err, data) => {
      if (err) throw err;
      //check whether a product is found. if not, send error.
      if (data) {
        res.send(data);
      } else {
        res.status(404).send("Product not found.");
      };
    });
  });

//GET /reviews: Returns ALL the reviews, but limited to 40 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an options page query to paginate.
  router.get('/reviews', (req, res, next) => {
    let reviews = [];
    let resultsPerPage = 40;
    let startIndex = 0;

    //check if pagination query has been passed. If so, grab start and stop index. Stop index for one page will always be startIndex + resultsPerPage.

    if (req.query.page) {
      startIndex = parseInt(req.query.page) * resultsPerPage;
    }

    let stopIndex = startIndex + resultsPerPage;

    Product.find({}, (err, data) => {
      if (err) throw err;
      data.forEach( (product) => {
        reviews = reviews.concat(product.reviews);
      });

      let response = reviews.slice(startIndex, stopIndex);

      res.send(response);
    });
  });
    

//POST /products: Creates a new product in the database

router.post('/products', (req, res, next) => {
  let newProduct = new Product ({...req.body});
  
  //check if product already exists in database. let's assume a product with the same category and name is an identical product.

  Product.find({name: newProduct.name, category: newProduct.category}, (err, data) => {
    if (err) throw err;
    if (data.length) {
      return res.status(401).send(`${newProduct.name} already exists in database.`)
    }
    newProduct.save((err, product) => {
      if (err) throw err;
      res.send(`${product.name} saved!`)
    });
  });
});
  


//POST /:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.
  router.post('/:product/reviews', (req, res, next) => {
  
   //first, check that a review has been sent. This should be an object with a username and text.
   if (!req.body.username || !req.body.text) {
     return res.status(400).send("Request body must contain a username and text.")
   }

  //look for the requested product
    Product.findById(req.params.product, (err, product) => {
      if (err) throw err;
   //check whether a product is found. if not, send error.
      if (!product) {
        return res.status(404).send("Product not found.")
      } else {
    //if found, add review to product's reviews array
        let review = {
          username: req.body.username,
          text: req.body.text,
          product: product.id
        }
        product.reviews.push(review);
        product.save( (err, product) => {
          if (err) throw err;
          res.send(product);
        })
      };
    });
  });

//DELETE /products/:product: Deletes a product by id
router.delete('/products/:product', (req, res, next) => {  
 
  //check for invalid product Id before querying database.
  if (!mongoose.Types.ObjectId.isValid(req.params.product)){
    return res.status(400).send("Invalid product ID.");
  };

  Product.findById(req.params.product, (err, product) => {
      if (err) throw err;
    //check whether a product is found. if not, send error.
      if (!product) {
        return res.status(404).send("Product not found.")
      } else {
        product.remove( (err, product) => {
          if (err) throw err;
          res.send(`${product.name} deleted!`)
        }); 
      }
    });
  });//check for invalid product Id before querying database.

//DELETE /reviews/:review: Deletes a review by id
  router.delete('/reviews/:review', (req, res, next) => {
    
    Product.findOne({'reviews._id': req.params.review}, (err, product) => {
      if (err) throw err;
      if (!product) {
        return res.status(401).send("Review not found.")
      }
      
      let deleteIndex = product.reviews.findIndex( (review) => {
        return review.id === req.params.review;
      });

      let deletedReview = product.reviews.splice(deleteIndex, 1);
      
      product.save( (err, product) => {
        if (err) throw err;
        res.send(`${deletedReview[0].text} by ${deletedReview[0].username} deleted!`)
      });

    });

  })


module.exports = router;
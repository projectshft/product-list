const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')
const bodyParser   = require('body-parser');
const url = require("url");
const querystring = require('querystring');


router.use(bodyParser.json());

// router.get('/generate-fake-data', (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product()
//     let reviews = new Review({
//       userName: "user123",
//       text: "This is the best product EVVVVER!",
//       product: product
//     })
//     product.category = faker.commerce.department()
//     product.name = faker.commerce.productName()
//     product.price = faker.commerce.price()
//     product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
//     product.reviews = reviews
//     product.save((err) => {
//       if (err) throw err
//     })
//     reviews.save((err)=>{
//       if (err) throw err
//     })
//   }
//   res.end()
// })

// router.param('product', function(req, res, next, id) {
//   req.product = Product.find(product => product.id === id);
//   next();
// });



router.get('/products', (request, response, next) => {
  const parsedUrl = url.parse(request.originalUrl);
  const { query, sort } = querystring.parse(parsedUrl.query);
  const queryCategory = request.query.category
  const perPage = 9
  const queryPrice = request.query.price
  // return the first page by default
  const page = request.query.page || 1

  if(queryCategory !== undefined){
    if(queryPrice == 'lowest'){
      Product.find({category: queryCategory})
      // .skip((perPage * page) - perPage)
      // .limit(perPage)
      .sort({price: 'ascending'})
      .exec((error, products) => {
        if (products.length == 0){
          response.writeHead(404);	
          return response.end("Could not find products in that category.");
        } else{
          response.writeHead(200);
          response.send(products)
        }
      })
    } else if (queryPrice == 'highest'){
      Product.find({category: queryCategory})
      // .skip((perPage * page) - perPage)
      // .limit(perPage)
      .sort({price: 'descending'})
      .exec((error, products) => {
        if (products.length == 0){
          response.writeHead(404);	
          return response.end("Could not find products in that category.");
        } else{
          response.writeHead(200);
          response.send(products)
        }
      })
    }else if (queryPrice !== undefined){
      response.writeHead(400);	
      return response.end("Could not read query search. Must enter lowest or highest.")
    }else {
      Product.find({category: queryCategory})
      // .skip((perPage * page) - perPage)
      // .limit(perPage)
      .exec((error, products) => {
        if (products.length == 0){
          response.writeHead(404);	
          return response.end("Could not find products in that category.");
        } else{
          response.writeHead(200);
          response.send(products)
        }
      })
    }
  } else if (queryPrice !== undefined){
    if(queryPrice == 'lowest'){
      Product
      .find({})
      .sort({price: 'ascending'})
      // .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((error, products) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
        Product.count().exec((error, count) => {
          if(error){
            if (err) throw err
          }
          response.writeHead(200);
          response.send(products)
        })
      })
    }else if (queryPrice == 'highest'){
      Product
      .find({})
      .sort({price: 'descending'})
      // .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((error, products) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
        Product.count().exec((error, count) => {
          if(error){
            if (err) throw err
          }
          response.writeHead(200);
          response.send(products)
        })
      })
    } else{
      response.writeHead(400);	
      return response.end("Could not read query search. Must enter lowest or highest.")
    }
  }else{
  //For pagination use bootstrap
    Product
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((error, products) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
        Product.count().exec((error, count) => {
          if(error){
             return next(error)
          }
          response.writeHead(200);
          response.send(products)
        })
      })
  }
})

router.get("/products/:product", (request, response) => {
  let id = request.params.product
  // if(id == undefined){
  // response.writeHead(404);
  // return response.end("Must search an id.");
  // }
  Product
  .findById(id).exec((error, product) => {
    if (error){
      response.writeHead(404);	
      return response.end("Could not find product with that id.");
    } else{
      response.send(product)
    }
  })
});

//all reviews, but limit to 40 at a time
router.get("/reviews", (request, response) => {
  Review
  .find({})
  .limit(40)
  .exec((err, reviews) => {
    // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
    Product.count().exec((err, count) => {
      if (err) return next(err)

      response.send(reviews)
    })
  })
});

//create new product
router.post("/products", (request, response) => {
    let productItem = request.body
    if (!productItem.category || !productItem.name || !productItem.price || !productItem.image) {
      response.writeHead(400);	
      return response.end("Incorrectly formatted response. Must have category, name, price, and image.");
    }
   
    let productToAdd = new Product ()
    let reviewToAdd = new Review({
      userName: "user123",
      text: "This is the best product EVVVVER!",
      product: productToAdd
    })

    productToAdd.category = productItem.category
    productToAdd.name = productItem.name
    productToAdd.price = productItem.price
    productToAdd.image = productItem.image
    productToAdd.reviews = reviewToAdd

    productToAdd.save((err, product) =>{
      if (err) return err

      response.send(product)
    })

});

// //create new product
router.post("/:product/reviews", (request, response) => {
  let productId = request.params.product
  Product
  .findById(productId).exec((error, product) => {
    if (error){
      response.writeHead(404);	
      return response.end("Could not find product with that id.");
    } else{
      let review = request.body
      if (!review.userName || !review.text) {
        response.writeHead(400);	
        return response.end("Incorrectly formatted response. Must have username and text.");
      }
      let reviewToAdd = new Review()
      reviewToAdd.userName = review.userName
      reviewToAdd.text = review.text
      reviewToAdd.product = product

      reviewToAdd.save((err, review) =>{
        if (err) return err
        product.reviews.push(reviewToAdd);
        product.save((err, product) => {
          //populate and send
          response.send(review)
        })
        
      })

    }
  })  
})

//delete a product by id
router.delete("/products/:product", (request, response) => {
  let id = request.params.product
 
  Product
  .findByIdAndRemove(id).exec((error, product) => {
    if (error){
      response.writeHead(404);	
      return response.end("Could not find product with that id.");
    } else{
      response.send(product)
    }
  })
});


router.delete('/reviews/:review', (request, response, next) => {
  let reviewId = request.params.review
  Review.findById(reviewId, (error, review) => {
    if (error){
      response.writeHead(404);	
      return response.end("Could not find a review with that id.");
    } else{
      Product.update(
          { _id: review.product},
          {'$pull': { 'reviews': review._id } }
        ).exec((error, result) => {
          if (error){
            response.writeHead(404);	
            return response.end("No product had that review id.");
          }
      });
      review.remove()
      response.send(`Review with id:${reviewId} was removed.`);
    }
  })
});

module.exports = router
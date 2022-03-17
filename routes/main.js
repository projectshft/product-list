const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review")



//NOTE TO SELF - THESE ROUTES ARE WORKING BUT THE DATA ISN"T YET FOR THE FIELDS WE WANT!
router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews = [];
    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});


//General get for all products and based on optional parameters 
//Pagination included here
router.get("/products", (req, res, next) => {
  let {page} = req.query || 1;
  let {category, price, query} = req.query;

  let sortObj = {}

  if(price) {
    if(price.toLowerCase() === 'highest') {
      sortObj.price = -1
    }

    else if(price.toLowerCase() === 'lowest') {
      sortObj.price = 1;
    }
    else {
      sortObj.price = null;
    }
  }

  //Re-formatting to match how category is shown in the database
  let categoryR = "";
  let queryR = "";

  let queryObj = {};

  if(category) {  
    categoryR = category[0].toUpperCase() + category.substring(1)
    queryObj.category = categoryR;
  }

  if(query) {  
    queryR = query[0].toUpperCase() + query.substring(1)
    queryObj.name = {"$regex": queryR}}
 

  let perPage = 9;

  

  //Optional query parameters for category


  // if(!category && !price) {
  Product.find(queryObj)
  .skip((page * perPage) - perPage)
  .limit(perPage)
  .sort(sortObj)
  .exec( (err, result) => {
    if (!result.length) {
      res.send("Sorry no products match this description")
       }
    if(err) {
      console.log(err)
    }
    else {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(result));
    }
  })
})



router.get("/products/:product", (req, res, next) => {
  let {product} = req.params;

  Product.find({_id: product}).exec( (err, result) => {
    if(err) {
      console.log(err)
    }
    else {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(result));
    }
  })
});

//  GET /products/:product/reviews: Returns ALL the reviews for a product, but  This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an optional page query parameter to paginate.
router.get("/products/:product/reviews", (req,res,next) => {
  let {product} = req.params

   Product.findOne({_id: product})
    .populate("reviews")
    .exec((err, reviews) => {
      if(err) {
        console.log(err)
      }
        else {
      // res.writeHead(200, { "Content-Type": "application/json" });
      res.send({reviews})
      }
    });
});
  
 
// POST /products: Creates a new product in the database
router.post("/products", (req,res,next) => {
  let productNew = req.body

  if(!productNew) {
    res.writeHead(400, "There is no product to add");
    return res.end();
  }

 let product = new Product();
  product.category = productNew.category
  product.name = productNew.name
  product.price = productNew.price
  product.image = productNew.image
  product.reviews = []
  product.save((err) => {
    if (err) throw err;
  });
    return res.send({product});  
  });




// POST /products:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.
router.post("/products/:product/reviews", (req,res,next) => {
  let {product} = req.params

  if(!product) {
    res.writeHead(400, "There is no product to add your review");
    return res.end();
  }

  if(!req.body) {
    res.writeHead(400, "There is no review to post");
    return res.end();
  }

  let username = req.body.username;
  let text = req.body.text;

  if(!username || !text) {
    res.writeHead(400, "A username and text are needed to post a review");
    return res.end();
  }

  //For product, all we gathered in the params was the _id 
  let review = new Review({
    product: product._id,
    username,
    text
  });

  review.save();

  Product.findOneAndUpdate(
    { _id: product}, 
    { $push: { reviews: review  } },
    {safe: true, upsert: true, new : true},
    (err, success) => {
         if (err) {
             console.log(error);
         } else {
             console.log(success);
         }
     });
 
  return res.end(product);
})

// DELETE /products/:product: Deletes a product by id
router.delete("/products/:product", (req,res,next) => {
  let {product} = req.params

  Product.deleteOne({ _id: product }, (err) => {
    if (err) throw err;
  
    console.log("Product deleted!");
    return res.end();
  });
 

})

// DELETE /reviews/:review: Deletes a review by id
router.delete("/products/:product/reviews/:review", (req,res,next) => {
  let {review} = req.params
  let {product} = req.params

 Review.deleteOne({_id: review}, (err) => {
   if(err) throw err;

   Product.updateOne( 
    {_id: product},
      { $pull: { reviews: review }}, (err) => {
      if(err) throw err;
    }
);
   console.log("Review deleted")
   return res.end();
 })
})

module.exports = router
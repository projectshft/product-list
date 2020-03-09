const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

//GET route from generating fake product data
router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()
    let review = new Review({text: "Beautifully machine-crafted", userName: "Black-Knight"})

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'http://www.beeville.net/fbcsweb/Texas_Outline.jpg'
    product.reviews.push(review)

    product.save((err) => {
      if (err) throw err
      else {
        review.product = product._id
        review.save((err) => {
          if (err) throw err
        })
      }
    })

  }
  res.end()
})

//GET route for returning products from the server
//Returns all products or returns products by category
//Ordered either by order on the server or by price
router.get('/products', (req, res, next) => {req.query.q
  let queryVal = (parseInt(req.query.page) - 1) || 0
  queryVal = (queryVal * 9)

  search = {}

  if (req.query.category) {
    let category = req.query.category.charAt(0).toUpperCase() + req.query.category.substring(1)
    search.category = category
  }

  priceOrder = {}

  if (req.query.price) {
    if (req.query.price == "highest") {
      priceOrder.price = "desc"
    } else if (req.query.price == "lowest") {
      priceOrder.price = "asc"
    }
  }

  Product.find(search).sort(priceOrder).skip(queryVal).limit(9).exec((err, products) => {
      Product.find(search).count().exec((err, count) => {
        if (err) throw err
        else {
          res.send({products: products, count: count})
        }
      })
  })
})

//GET route for returning a single product by product id
router.get("/products/:productId", (req, res, next) => {
  Product.findOne({_id: req.params.productId}).exec((err, product) => {
    if (err) {
      res.send(err)}
    else {
      Product.findOne({_id: req.params.productId}).count().exec((err, count) => {
        if (err) {
          res.send(err)
        } else if (count == 0) {
          res.send("No matching products found")
        } else {
          res.json(product)
        }
      })
    }
  })
})

//POST route for adding a new product to the products database
router.post("/products", (req, res, next) => {
  let product = new Product()

  if (req.body.category == undefined || req.body.category.length == 0) {
    res.send("Please add a category for this product")
  } else if (req.body.productName == undefined || req.body.productName.length == 0)  {
    res.send("Please add a product name for this product!")
  } else if (req.body.price == undefined || req.body.price.length == 0)  {
    res.send("Please add a price for this product!")
  } else if (req.body.image == undefined || req.body.image.length == 0)  {
    res.send("Please add an image for this product!")
  } else {

    product.category = req.body.category
    product.name = req.body.productName
    product.price = req.body.price
    product.image = req.body.imageUrl
    product.reviews = []

    product.save((err) => {
      if (err) {
        res.send(err)
      } else {
        res.send("Item succesfully added!")
      }
    })
  }
})

//GET route for getting all reviews from the database
router.get('/reviews', (req, res, next) => {req.query.q
  const queryVal = parseInt(req.query.q) || 0

  Review.find({}).skip(queryVal).limit(40).exec((err, reviews) => {
    Review.count().exec((err, count) => {
      if (err) {
        res.send(err)
      }
      else {
        res.send({reviews: reviews, count: count})
      }
    })
  })
})

//POST route for posting a new review
//Reviewed posted to the product matching the product id in the URL
router.post("/:productId/reviews", (req, res, next) => {
  let review = new Review()

  if (req.body.text == undefined) {
    res.send("Cannot post an empty review!")
  } else if (req.body.userName == undefined) {
    res.send("Please add a user name to your review!")
  } else if (req.body.productId == undefined){
    res.send("Please add a product id for this review!!")
  } else {

    review.text = req.body.text
    review.userName = req.body.userName
    review.product = req.params.productId

    Product.findById(req.params.productId).exec((err, product) => {
      if (err) {
        res.send(err)
      } else {
        review.save((err) => {
          if (err) {
            res.send(err)
          } else {
            product.reviews.push(review)
            product.save()
            res.send("Review successfully added!")
          }
        })
      }
    })
  }
})

//DELETE route for deleting a product from the server
router.delete("/products/:productId", (req, res, next) => {
  Product.findByIdAndRemove(req.params.productId, (err) => {
    if (err) {
      res.send(err)
    } else {
      res.send("Item deleted!")
    }
  })
})

//DELETE route for deleting a single product review 
//Deletes review from reviews collection
//And deletes review references on the linked product item
router.delete("/reviews/:review", (req, res, next) => {
  const reviewId = req.params.review
  Review.findById(reviewId)
    .populate("product")
    .exec((err, review) => {
      if (err) {
        res.send(err)
      } else {
        Product.findById(review.product.id, (err, product) => {
          if (err) {
            res.send(err)
          } else {
            product.reviews = product.reviews.filter((review) => {
              return review._id != req.params.review
              })

            product.save()

            Review.findByIdAndRemove(req.params.review, (err) => {
              if (err) {
                res.send(err)
              } else {
                res.send("Review deleted!")
              }
            })
          }
        })
      }
    })

})

//GET route for searching the product
//Search method finds any product on the server
//that contain the search query
router.get("/search", (req, res, next) => {
  let query = req.query.query.charAt(0).toUpperCase() + req.query.query.substring(1)

  Product.find({"name" : {$regex : `.*${query}.*`}}).limit(9).exec((err, products) => {
    if (err) throw err
    else {
      Product.find({"name" : {$regex : `.*${query}.*`}}).count().exec((err, count) => {
        if (err) throw err
        else {
          res.send({products: products, count: count})
        }
      })
    }
  })
})

router.post("/")

module.exports = router
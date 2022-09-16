const router = require("express").Router();
const {faker} = require("@faker-js/faker");
const Product = require("../models/product");
const Review = require("../models/review")

router.get(`/products`, (req, res, next) => {
  let itemsPerPage = 9

  let page = req.query.page || 1

  Product.find({})
  .skip(itemsPerPage * page - itemsPerPage)
  .limit(itemsPerPage)
  .exec((error, products) => {
    Product.count().exec((err, count)=> {
      if(err) return next(err)
      res.send(products);
    })
  });
});

router.get("/products/:productId", (req,res, next)=>{
  const id = req.params.productId
  Product.findById(id).exec((error, product) => {
    if(error) return next(error)
    res.send(product)
  })
})

router.get("/products/:productId/reviews", (req,res,next)=> {
  const id = req.params.productId
  let reviewsPerPage = 4
  let page = req.query.page || 1

  Product.findById(id)
    .exec((error, product) => {
      let revArray = product.reviews
      const paginateReviewsArray = (array, pageSize, pageNumber) =>{
        return(array.slice(((pageNumber * reviewsPerPage) - reviewsPerPage ), (pageNumber * pageSize)))
      }
      res.send(paginateReviewsArray(revArray, reviewsPerPage, page))
        
      })


    })


// Code below is for populating fake data

const reviewAmountGenerator = () => {
  return Math.floor(Math.random() * 10)
}

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 20; i++) {
    let product = new Product();


    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews = []
    for (let r = 0; r < reviewAmountGenerator(); r++) {
      let review = new Review()
      review.userName = faker.internet.userName()
      review.text = faker.lorem.lines()
      product.reviews.push(review)
    }
    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

module.exports = router;
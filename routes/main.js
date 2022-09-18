const router = require("express").Router();
const {faker} = require("@faker-js/faker");
const { default: mongoose } = require("mongoose");
const product = require("../models/product");
const Product = require("../models/product");
const Review = require("../models/review")
// let Product = mongoose.model('Product')
// let Review = mongoose.model('Review')

router
  .get(`/products`, (req, res, next) => {
    let searchTerms = {}
    let itemsPerPage = 9
    let page = req.query.page || 1
    if(req.query.category){
      let searchCategory = req.query.category
      searchTerms.category = {$regex: searchCategory, $options: "i"}
    } 
    if(req.query.highest){}
      Product.find(searchTerms)
      .skip(itemsPerPage * page - itemsPerPage)
      .limit(itemsPerPage)
      .exec((error, products) => {
        Product.count().exec((err, count)=> {
          if(err) return next(err)
          res.send(products)
          res.status(200)
          res.end()
        })
      });
})

  .post("/products", (req,res,next)=> {
  const {category, name, price, image} = req.body
  let newProduct = new Product({})
    newProduct.category = category,
    newProduct.name = name,
    newProduct.price = price,
    newProduct.image = image,
    newProduct.reviews = []
    let returnProduct = newProduct.save((err)=>{
      if (err) throw err
    })
    res.json(returnProduct)
    res.end()
})

router

  .get("/products/:productId", (req,res, next)=>{
    const id = req.params.productId
    Product.findById(id).exec((error, product) => {
      if(error) return next(error)
      res.status(200).send(product).end()
      // console.log(product)
    })
  })

  .delete("/products/:productId", (req,res,next)=>{
    const id = req.params.productId
    Product.findByIdAndDelete(id).exec((error) => {
      if(error) return next(error)
      res.status(204).end()
    })
  })

router
  .get("/products/:productId/reviews", (req,res,next)=> {
    const id = req.params.productId
    let reviewsPerPage = 4
    let page = req.query.page || 1

    Product.findById(id)
      .exec((error, product) => {
        let revArray = product.reviews
        const paginateReviewsArray = (array, pageSize, pageNumber) =>{
          return(array.slice(((pageNumber * reviewsPerPage) - reviewsPerPage ), (pageNumber * pageSize)))
        }
        res.status(200).send(paginateReviewsArray(revArray, reviewsPerPage, page)).end()
        })
      })
  
  .post('/products/:productId/reviews', async (req,res,next)=>{
    const id = req.params.productId
    const {userName, text} = req.body
    let newReview = new Review({})
      newReview.userName = userName,
      newReview.text = text
    const product = await Product.findById(id)
    
    product.reviews.push(newReview)
    product.save()
    res.status(200)
    res.end()
  })

  .delete("/products/:productId/reviews/:reviewId", async (req,res,next)=>{
    const productId = req.params.productId
    const reviewId = req.params.reviewId
    console.log(`prod: ${productId} / rev: ${reviewId}`)
    // deleteReview(productId, reviewId)
    const product = await Product.findById(productId)
    let newReviewArray = []
      product.reviews.filter(review => {
        if(review._id != reviewId){
          newReviewArray.push(review)
        }
      })
      product.reviews = newReviewArray
      await product.save()
    res.status(204)
    res.end()
  })

  

// Code below is for populating fake data

// const reviewAmountGenerator = () => { 
//   return Math.floor(Math.random() * 10)
// }

// router.get("/generate-fake-data", (req, res, next) => {
//   for (let i = 0; i < 20; i++) {
//     let product = new Product();


//     product.category = faker.commerce.department();
//     product.name = faker.commerce.productName();
//     product.price = faker.commerce.price();
//     product.image = "https://via.placeholder.com/250?text=Product+Image";
//     product.reviews = []
//     for (let r = 0; r < reviewAmountGenerator(); r++) {
//       let review = new Review()
//       review.userName = faker.internet.userName()
//       review.text = faker.lorem.lines()
//       product.reviews.push(review)
//     }
//     product.save((err) => {
//       if (err) throw err;
//     });
//   }
//   res.end();
// });

module.exports = router;
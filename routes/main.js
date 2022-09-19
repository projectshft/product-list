const router = require("express").Router();
const {faker} = require("@faker-js/faker");
const { default: mongoose } = require("mongoose");
const product = require("../models/product");
const Product = require("../models/product");
const Review = require("../models/review")
// const paginate = require("mongoose-paginate-v2")
// let Product = mongoose.model('Product')
// let Review = mongoose.model('Review')

router
  .get(`/products`, async (req, res, next) => {
    const options ={
      page: req.query.page || 1,
      limit: 9,
    }
    const query = {}
    const callback = {}
    // let searchTerms = {}
//     let sortTerms = {}
//     let itemsPerPage = 9
//     let page = req.query.page || 1
    if(req.query.category){
      let searchCategory = req.query.category
      query.category = {$regex: searchCategory, $options: "i"}
    } 
    if(req.query.price == 'highest'){
      options.sort = {price: 'desc'}
    }
    if(req.query.price == 'lowest'){
      options.sort = {price: 'asc'}
    }
    if(req.query.search){
      let searchTerm = req.query.search
      query.name = {$regex: searchTerm, $options: "i"}
    }
//       await Product.find(searchTerms).sort(sortTerms)
//       .skip(itemsPerPage * page - itemsPerPage)
//       .limit(itemsPerPage)
//       .exec((error, products) => {
//         // const totalDocs = productsToReturn.length
//         Product.count().exec((err, count)=> {
//           if(err) return next(err)
//           res.send({count: count, products: products})
//           res.status(200)
//           res.end()
//         })
//       });

const products = await Product.paginate(query, options, callback)
  console.log(products)
  res.send(products)
})

  .post("/products", (req,res,next)=> {
  const {category, name, price, image} = req.body
  const newProduct = new Product({
    category, name, price, image, reviews:[]
  }).save((err)=>{
      if (err) throw err
    })
    res.json(newProduct)
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
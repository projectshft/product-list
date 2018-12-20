const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");
const fetch = require('node-fetch')


/*=====================================================
Generate and populate database with data
NO LONGER NEEDED DATA AS OF 12/20/18 3:11 PM
=====================================================*/
// router.get("/generate-fake-data", async (req, res, next) => {
//   let productImg = await fetch("https://picsum.photos/list")
//     .then(res => res.json())
//     console.log(productImg)
//   for (let i = 0; i < 993; i++) {
//     let numberOfReviews = Math.floor(Math.random()*20)
//     let product = new Product();
    
//     product.category = faker.commerce.department();
//     product.name = faker.commerce.productName();
//     product.price = faker.commerce.price();
//     product.image = productImg[i].post_url
//     product.description = faker.lorem.sentences();
//     product.reviews = []

//     for (let k = 0; k < numberOfReviews; k++) {
//       let review = new Review({
//         username: faker.internet.userName(),
//         text: faker.lorem.paragraphs(),
//         rating: Math.floor(Math.random() * 11),
//         product:product._id
//       })
//       review.save()
//       product.reviews.push(review);
//     }


//     product.save(err => {
//       if (err) throw err;
//     });
//     // console.log(product.image)
//   }
//   console.log(("done"))
//   res.end("Success");
// });

router.param("product", async function (req, res, next, id) {

  req.product = await Product.findById(id).populate('reviews').exec();

  next();
});

router.get('/product', async (req,res, next) => {
  let {page} = req.query || 1;
  const perPage = 10;
  
  let results = await Product.find({}).skip((page * perPage) - perPage).limit(perPage)
  
  res.send(results)
})

router.get('/product/:product', (req, res) => {

//uses the param middleware to find the specific product by ID
  res.send(req.product)
})

router.get('/reviews', async (req,res) => {

  let { page } = req.query || 1;
  const perPage = 40;

  let results = await Review.find({}).skip((page * perPage) - perPage).limit(perPage)
  res.send(results)
})

router.post('/products', async (req, res) => {
  let product = req.body
  //try and add the item to the database

    let newProduct = new Product ({
      category: product.category,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      reviews:[]
    })
    newProduct.save()
    .then(result => res.send("Product Saved"))
    .catch(err => res.status(400).send(err))
})

router.post("/products/:product/reviews", (req,res) => {
  let review = new Review({
    username:req.body.username,
    text:req.body.text,
    rating:req.body.rating,
    product:req.product._id
  })
  review.save()
  .then(result => res.send("review saved to database"))
  .catch(err => res.send(err));
  
});

module.exports = router;

const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");
const fetch = require('node-fetch')


/*=====================================================
Generate and populate database with data
=====================================================*/
router.get("/generate-fake-data", async (req, res, next) => {
  let productImg = await fetch("https://picsum.photos/list")
    .then(res => res.json())
    console.log(productImg)
  for (let i = 0; i < 993; i++) {
    let numberOfReviews = Math.floor(Math.random()*20)
    let product = new Product();
    
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = productImg[i].post_url
    product.description = faker.lorem.sentences();
    product.reviews = []

    for (let k = 0; k < numberOfReviews; k++) {
      let review = new Review({
        username: faker.internet.userName(),
        text: faker.lorem.paragraphs(),
        rating: Math.floor(Math.random() * 11),
        product:product._id
      })
      review.save()
      product.reviews.push(review);
    }


    product.save(err => {
      if (err) throw err;
    });
    // console.log(product.image)
  }
  console.log(("done"))
  res.end("Success");
});

router.get('/products', async (req,res, next) => {
  let {page} = req.page || 1;
  const perPage = 10;
  
  let results = await Product.find({}).skip((page * perPage) - perPage).limit(perPage)
  
  res.send(results)
})

module.exports = router;

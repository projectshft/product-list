const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");
const User = require('../models/user')
const fetch = require("node-fetch");
const uid = require('rand-token').uid
/*=====================================================
Generate and populate database with data
***if you want images, the second api requires some time (about .5 sec for each product)
so keep that in mind when populating your database
=====================================================*/
// router.get("/generate-fake-data", async (req, res, next) => {

//   for (let i = 0; i < 500; i++) {
//     let productImg = await fetch("https://picsum.photos/200/300/?random").then(r => r.url);
//     let numberOfReviews = Math.floor(Math.random()*20)
//     let product = new Product();
//     console.log(productImg)
//     product.category = faker.commerce.department();
//     product.name = faker.commerce.productName();
//     product.price = faker.commerce.price();
//     product.image = productImg,
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

// router.get('/generate-fake-users' , (err,res )=> {
//   for (let i = 0; i < 100; i++) {
//     let user = new User({
//       username: faker.internet.userName(),
//       cart:[],
//       password:faker.internet.password()
//     })
//     user.save(err => {
//       if (err) throw err
//     })
//     res.send("done?")
//   }
// })

//this token array is being used until I want to make a token database.
let activeTokens = [];


router.use(async (req, res, next) => {
  //token checking middleware, if a valid token is submitted it gets added to the request body
  let { token } = req.query
  if (!token) {
    req.tokenObj = null;
  } else {
    let authUserToken = activeTokens.find(tokenObj => tokenObj.id === token);
    if (!authUserToken) {
      req.tokenObj = null;
    } else {
      req.tokenObj = authUserToken
    }
  }
  next();
})

router.use(async (req, res, next) => {
  if (req.tokenObj) {
    let authUser = await User.findOne({ username: req.tokenObj.user })
      .populate('cart')
    if (!authUser) {
      req.authUser = null;
    } else {
      req.authUser = authUser
    }
  }
  else {
    req.authUser = null;
  }
  next()
})
router.use(async (req, res, next) => {
  if (req.authUser) {
    let { productId } = req.body;
    let product = await Product.findById(productId)
    if (product) {
      req.productModel = product;
    }
  } else {
    req.productModel = null
  }
  next()
})

router.param("product", async function (req, res, next, id) {
  //this middleware grabs the matching product and adds it to the request
  req.product = await Product.findById(id)
    .populate("reviews")
    .exec();

  next();
});
router.param("review", async function (req, res, next, id) {
  //this middleware grabs the review by ID and adds it to the request
  req.review = await Review.findById(id)
    .populate("products")
    .exec();

  next();
});

router.get("/products", async (req, res, next) => {
  //Setting up all the variables and search terms

  let search = req.query.search;
  let page = req.query.page || 1;
  page = parseInt(page);
  let mongoQueryObj = {};
  //To ensure a category was selected and isn't somehow undefined
  if (req.query.category && req.query.category !== "All") {
    mongoQueryObj.category = req.query.category;
  }
  //default to ascending
  let price = req.query.price;
  if (!price) {
    price = 1;
  } else {
    price = parseInt(price);
  }

  const perPage = 12;

  if (search) {
    Object.assign(mongoQueryObj, {
      $text: { $search: search, $caseSensitive: false }
    });
  }
  Product.find(mongoQueryObj)
    .sort({ price: price })
    .exec((err, result) => {
      res.send({
        total_products: result.length,
        url: req.originalUrl,
        page_count: Math.floor(result.length / perPage),
        page_number: page,
        products: result.slice(page - 1, page + 11)
      });
    });
});

router.get("/products/:product", (req, res) => {
  //uses the param middleware to find the specific product by ID
  res.send(req.product);
});

router.get("/reviews", async (req, res) => {
  let { page } = req.query || 1;
  const perPage = 40;

  let results = await Review.find({})
    .skip(page * perPage - perPage)
    .limit(perPage);
  res.send(results);
});

router.post("/products", async (req, res) => {
  let product = req.body;
  //try and add the item to the database

  let newProduct = new Product({
    category: product.category,
    name: product.name,
    price: product.price,
    image: product.image,
    description: product.description,
    reviews: []
  });
  newProduct
    .save()
    .then(result => res.send("Product Saved"))
    .catch(err => res.status(400).send(err));
});

router.post("/products/:product/reviews", (req, res) => {
  let review = new Review({
    username: req.body.username,
    text: req.body.text,
    rating: req.body.rating,
    product: req.product._id
  });
  req.product.reviews.push(review);
  req.product
    .save()
    .then(() => review.save())
    .then(result => res.send("review saved to database"))
    .catch(err => res.send(err));
});

router.delete("/products/:product/reviews/:review", async (req, res) => {
  await Product.updateOne(
    { _id: req.product._id },
    { $pull: { reviews: req.review._id } }
  ).exec();

  await req.product.save();
  await Review.findByIdAndDelete(req.review._id).exec();
  await req.review.save();
  res.send();
});

router.delete("/products/:product", async (req, res) => {
  await Product.findByIdAndDelete(req.product._id).exec();
  res.send(200);
});

router.post('/login', async (req, res) => {
  let { user, passphrase } = req.body;
  let userObj = await User.findOne({ username: user })
  if (userObj.password !== passphrase) {
    res.status(401).send({ error: "invalid credentials" });
  } else {
    let userToken = req.token

    if (!userToken) {
      //make a new token
      let newToken = {
        id: uid(16),
        // id: "123",
        user: user,
        updated: new Date()
      }
      activeTokens.push(newToken)
      return res.send(JSON.stringify(newToken))
    } else {
      userToken.updated = new Date()
      return res.send(JSON.stringify(userToken))
    }
  }
})

router.get('/me/cart', async (req, res) => {
  if (!req.authUser || !req.tokenObj) {
    res.status(401).send({ error: "invalid credentials" });
  }
  res.send(req.authUser.cart)
})

router.post('/me/cart', async (req, res) => {
  if (!req.authUser || !req.tokenObj) {
    res.status(401).send({ error: "invalid credentials" });
  } else {
    if (!req.productModel) {
      res.status(404).send({ error: "product not found" });
    }
    req.authUser.cart.push(req.productModel._id);
    await req.authUser.save();
    res.send(req.authUser.cart)
  }

})

router.delete('/me/cart', async (req, res) => {
  if (!req.authUser || !req.tokenObj) {
    return res.send(401, "Unauthorized access")
  } else {
    if (!req.productModel) {
      return res.send(404, "Product not found")
    }
    req.authUser.cart = req.authUser.cart.filter(item => item.id != req.productModel.id);
    await req.authUser.save();
    res.send(req.authUser.cart)
  }
})
//this is only used to get a user to use. I haven't made a makeAccount feature just yet
router.get('/get-user-data', async (req, res) => {
  let foundUser = await User.findOne({});
  res.send(foundUser)
})

/*=====================================================
lucky user: {
  "_id" : ObjectId("5c1f7e8e12154951c074a401"),
"cart" : [ ], "username" : "Chelsea.Runolfsdottir",
"password" : "50zTjGKHp7ij43p", "__v" : 0 }
=====================================================*/

module.exports = router;

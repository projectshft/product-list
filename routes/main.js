const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review")

//generates 90 random products in the products DB, no need to run again
router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.save()
    .then((result) => {console.log('Result: ', result)})
    .catch((e) => {console.log(e)});
  }
  res.end();
});

//this function allows to take the price query string and insert as an argument in the .sort() function
const handleQuerySort = (query) => {
    try{
      if (query === 'highest') {
        const highestObj = {price: -1};
        return highestObj
      }
      if (query === 'lowest') {
        const lowestObj = {price: 1};
        return lowestObj;
      }
    }catch(err){
      const emptyObj = {}
      return emptyObj; 
    }
}
//handles lower case queries since categories have 1st letter upper-cased
const handleQueryCategory = (query) => {
  try{
    const word = query;
    const firstLetter = word.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = word.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters;
    return capitalizedWord;
  }catch(err){
    const emptyCategoryParam = undefined;
    return emptyCategoryParam;
  }
}

//GET all products, with optional params like sorting or a specific page
router.get('/products', (req, res, next) => {
  const perPage = 9;
  // return the first page by default
  const page = req.query.page || 1;
  let paramCategory = handleQueryCategory(req.query.category);
  const sortByPrice = handleQuerySort(req.query.price);
  const paramQuery = req.query.query;
  console.log('paramCategory: ', paramCategory);

  let paramCategoryObj = {category: paramCategory};
  let paramQueryObj = { $text: { $search: paramQuery } };
  if(paramCategory === undefined) {
    paramCategoryObj = {};
  }
  if(paramQuery === undefined) {
    paramQueryObj = {};
  }

  Product.find()
  .and([paramCategoryObj, paramQueryObj])
  .sort(sortByPrice)
  .skip(perPage*page - perPage)
  .limit(perPage)
  .then(async (products) => {
    const productCount = await Product.find().and([paramCategoryObj, paramQueryObj]).countDocuments();
    res.send({
      products: products,
      productCount: productCount
    });
  })
  .catch((err) => {if (err) {
    console.log(err)
    res.end();
  }})
})

//GET specific product by its id
router.get('/products/:product', (req, res, next) => {
  const id = req.params.product
  
  Product.findById(id)
    .then((product) => {
      res.send(product);
      console.log('product found: ', product);     
      })
    .catch((err) => {
      res.json(err);
    })
})

//GET all reviews (limit to 4 at a time with pagination) for a 
//specific product by its id. Use model.findById() and paginate with optional 'page' 
//query param
router.get('/products/:product/reviews', (req, res, next) => {
  const id = req.params.product
  const perPage = 4;
  // return the first page by default
  const page = req.query.page || 1;

  Product.findById(id)
    .skip(perPage*page - perPage)
    .limit(perPage)
    .then((product) => {
      res.send(product.reviews);
      console.log(product.reviews);
    })
    .catch((err) => {
      res.json(err);
    })
})

//POST to create a new product
router.post('/products', (req, res, next) => {
  
  const prodDoc = new Product();
  prodDoc.category = req.body.category;
  prodDoc.name = req.body.name;
  prodDoc.price = req.body.price;
  prodDoc.image = req.body.image;

  prodDoc.save()
  .then((result) => {
    console.log('Result: ', result)
    res.json(prodDoc);
  })
  .catch((e) => {console.log(e)});
})

//POST to create a new review
router.post('/products/:product/reviews', (req, res, next) => {
  const id = req.params.product
  console.log('req.body', req.body);
  let prodId = Product.findById(id)
  .then((result) => {
    console.log('product query: ', result);

    let review = new Review({
      userName: req.body.userName,
      text: req.body.text,
      product: result._id
    });
    review.save();
    result.reviews.push(review);
    result.save();
    console.log('review saved: ', review);
    res.send(result);
    console.log('product query after adding review: ', result);
  })
  .catch((err) => {
    res.json(err)
  });
})

//DELETE a product by id
router.delete('/products/:product', (req, res, next) => {
  //product param is the product document's objectID
  const id = req.params.product
  
  Product.findByIdAndRemove(id)
    .then((result) => {
      res.send(result);
      console.log('product removed: ', result);
    })
    .catch((err) => {
      res.json(err);
    })
})

//DELETE a review by id
router.delete('/reviews/:review', (req, res, next) => {
  //review param is the review document's objectID
  const id = req.params.review
  
  Review.findByIdAndRemove(id)
    .then((result) => {
      res.send(result);
      console.log('review removed: ', result);      
    })
    .catch((err) => {
      res.json(err);
    })
})

module.exports = router;
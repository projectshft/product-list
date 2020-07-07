const router = require('express').Router()
// this is a package that will help us populate our database with a bunch of fake data.
const faker = require('faker')
const Product = require('./models/product')



/* Two get requests were completed to generate 180 product ('fake') documents in our collection, 
   The data faker will generate random categories, prices, pictures, and names for the products collection. 
   Each products will also be filled with a random number of reviews that are relevant to the product. 
*/

router.get('/generate-fake-data', (req, res, next) => {
  const adjectiveArray = ['great', 'awesome', 'awful', 'weird', 'useless'];

  for (let i = 0; i < 90; i++) {
    let product = new Product();
    let randomNumOfReviews = Math.floor(Math.random() * 10);
    const getReviews = (randomNumOfReviews, productName) => {
      let reviews = [];

      for (let j = 0; j < randomNumOfReviews; j++) {
        //let review = new Review();
        let randomNumOfAdjectiveArray = Math.floor(Math.random() * 5);
        reviews.push({
          userName: faker.name.findName(),
          text: `This ${productName} is ${adjectiveArray[randomNumOfAdjectiveArray]}`
        })
      }
      return reviews;
    }
    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = faker.image.image()
    product.reviews = getReviews(randomNumOfReviews, product.name)


    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})



/* Next we'll create our paginating GET route. We'll want the client to be able to pass in
   any "page" they want to get a different set of products each time and limit them to
   only 9 products at one time. 
*/
router.get('/products', (req, res, next) => {
  console.log('inside router.get /products')
  //set max products per page to 9
  const perPage = 9

  // return the first page by default
  const page = req.query.page || 1;


  // get optional query parameter from request to find by product category
  const categoryType = req.query.category || null;

  // get optional query parameter from request to sort the products by price (ascending or descending)
  const priceSortType = req.query.price || null;

  // get optional query search string from request to search products by their name and category
  const search = req.query.search || null;

  /* Here we'll create a regular expression based on the search term. This way we can 
    search the entire name of the product for just one word, instead of needing an exact
    match
  */
  const regex = new RegExp(search);

  /* This function will be called in the .sort method of the db query below and will 
     control if user sees/selects prices listed high to low or vice versa
  */
  const getSortType = priceSortType => {
    if (priceSortType == "Highest") {
      return 1;
    } else {
      return -1;
    }
  }

  /* Here we are building up are query. The queries are optional, so we will check if they
     are defined and if so, will add them to a query object that will be used in .find
     below
  */
  var query = {};
  if (categoryType) {
    query.category = categoryType;
  }
  if (search) {
    query.name = regex;
  }
  if (categoryType === "All") {
    query = {};
  }

  /* first we will search the products collection based on any category or search term 
     queries from the user. The skip method allows for pagination (eg, if the user wants
     to see page 2. Since products are limited to 9 per page by the .limit method, a new
     request must be made to view the products on different page numbers. 
  */
  Product
    .find(query)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort({ price: getSortType(priceSortType) })
    .exec((err, products) => {
      if (err) throw err;

      /* the products argument above represents the results of the first query search, and 
         will be limited to 9 or below. These are the products that we will return below in
         each response. However we also want to know the total number of products that were
         found in the .find query, so we handle this below with count(query) and this will
         give us the total count, which is needed for pagination. In order to persist the 
         state of the query on clicking a page number, the query values and total product
         count are appended to the response
      */
      Product.count(query).exec((err, count) => {
        if (err) return next(err)
        products.push({totalProducts: count});
        products.push({search: search})
        products.push({categoryType: categoryType});
        products.push({page: page})
        products.push({priceSortType: priceSortType})
        res.send(products);
      })
    })
})


/*
GET /products/:product: Returns a specific product by its id
*/
router.get('/products/:productId', (req, res, next) => {
  //get the productId from the request
  const productId = req.params.productId;

  Product
    .find({ _id: productId })
    .exec((err, foundProduct) => {
      if (err) return next(err)
      res.send(foundProduct)
    })
})



/*
GET /products/:product/reviews: Returns ALL the reviews for a product (by productId in url)
, but limited to 4 at a time. This one will be a little tricky as you'll have to retrieve
 them out of the products. You should be able to pass in an optional page query parameter
 to paginate. The reviews will come back as an array
*/

router.get('/products/:productId/reviews', (req, res, next) => {
  //gets the productId from the request
  const productId = req.params.productId;

  //limits the reviews to 4 per page
  const reviewsPerPage = 4

  // returns the first page of reviews by default, if user doesn't specify a page in the query
  const page = req.query.page || 1

  // this will search the products collection by product id and return the reviews for that product in an array

  Product
    .find({ _id: productId }, { reviews: { $slice: [0, reviewsPerPage] } })
    .skip((reviewsPerPage * page) - reviewsPerPage)
    .limit(reviewsPerPage)
    .exec((err, foundProduct) => {
      if (err) return next(err)

      Product.count({ _id: productId }).exec((err, count) => {
        if (err) return next(err)
        //count will be the total number of reviews
        console.log(count);
        res.send(foundProduct.reviews)
      })
    })
})



/*
POST /products: Creates a new product in the database (right now with randomly generated properties and an empty reviews array)
*/
router.post('/products', (req, res, next) => {

  let product = new Product();

  product.category = faker.commerce.department()
  product.name = faker.commerce.productName()
  product.price = faker.commerce.price()
  product.image = 'https://via.placeholder.com/250?text=Product+Image'
  product.reviews = []


  product.save((err) => {
    if (err) throw err
  })

  res.end()
})



/*
POST /products/:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.
*/
router.post('/products/:productId/reviews', (req, res, next) => {
  //gets the productId, review username and review text from the request
  const productId = req.params.productId;
  const reviewUserName = req.body.username;
  const reviewText = req.body.text;
  const newReview = {
    userName: reviewUserName,
    text: reviewText
  }

  // this will search the products collection by product id so that we can add the new review to it
  // $push will add a review to the reviews array, and setting new:true will return the updated record
  Product
    .findByIdAndUpdate(productId, { $push: { reviews: newReview } }, { new: true })
    .exec((err, product) => {
      if (err) throw err;
      res.send(product)
    })
})

/*
DELETE /products/:product: Deletes a product by id
*/
router.delete('/products/:productId', (req, res, next) => {
  productIdToDelete = req.params.productId;
  Product.findByIdAndDelete(productIdToDelete, function (err) {
    if (err) console.log(err);
    console.log("Successful deletion");
  });

  res.end()
})


/*
DELETE /reviews/:review: Deletes a review by id
*/
router.delete('/reviews/:reviewId', (req, res, next) => {

  const productId = req.body.productId
  const reviewIdToDelete = req.params.reviewId;
  Product.findByIdAndUpdate(productId, { $pull: { reviews: { _id: reviewIdToDelete } } })
    .exec((err, product) => {
      if (err) throw err;
    })

  res.end()
})


module.exports = router




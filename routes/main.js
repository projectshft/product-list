const router = require("express").Router();
const { faker } = require('@faker-js/faker');
const { Product } = require("../models/product");
const { Review } = require("../models/product")


const generateFakeReviews = () => {
  let reviews = []
  for (let i = 0; i < 24; i++) {
    let review = {
      userName: faker.internet.userName(),
      text: faker.word.words({ count: { min: 5, max: 30 } })
    }
    reviews.push(review);
  } 
  return reviews;
}
 
router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();
    let reviews = generateFakeReviews();
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews = reviews;
    // todo: reviews array for each item, at least 12 reviews each. subdocs for reviews. paginate reviews

    product.save()
  }
  res.end();
});

router.get("/products", (req, res, next) => {
  const perPage = 9;
  let count = async (queryObect) => {const documentCount = await Product.countDocuments(queryObect); return documentCount}
  let productResults = {}
  let queryObject = {}
  // return the first page by default
  const page = req.query.page || 1;
  const category = req.query.category;
  const price = req.query.price;
  const query = req.query.query;

  const toCorrectCasing = function (string) {
    return string.toLowerCase()
    .split()
    .map(letter => letter.charAt(0).toUpperCase() + string.substring(1)).join()
  }

  const sortByPriceFilterByCategory = (sortDirection, category) => {
    if(sortDirection === "highest" && !query) {
      queryObject = {category: toCorrectCasing(category)}
     Product.find(queryObject)
     .sort ("-price")
     .skip(perPage * page - perPage)
     .limit(perPage)
     .then(async (products, err) => {
      productResults.products = products;
      productResults.count = await count(queryObject);
      res.send(productResults);
        })
        .catch(err => err);
    }
    else if(sortDirection === "highest" && query) {
      queryObject = {$and: [{category: toCorrectCasing(category)}, {$text: {$search: toCorrectCasing(query)}}]}
      Product.find(queryObject)
      .sort("-price")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .then(async (products, err) => {
        productResults.count = await count(queryObject);
        productResults.products = products;
        res.send(productResults);
        
          })
          .catch(err => err);
      }
    else if (sortDirection === "lowest" && !query) {
      queryObject = {category: toCorrectCasing(category)}
      Product.find(queryObject)
      .sort("price")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .then(async (products, err) => {
        productResults.count = await count(queryObject);
        productResults.products = products;
        res.send(productResults);
       })
    .catch(err => err);}
    else if(sortDirection === "lowest" && query) {
      queryObject = {$and: [{category: toCorrectCasing(category)}, {$text: {$search: toCorrectCasing(query)}}]}
      Product.find(queryObject)
      .sort("price")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .then(async (products, err) => {
        productResults.count = await count(queryObject);
        productResults.products = products;
        res.send(productResults);
       });
      }
    else {filterByCategoryNoPrice(category);}
  }

  const sortByPriceNoCategory = (sortDirection) => {
      if(sortDirection === "highest" && query) {
        queryObject = { $text: {$search: toCorrectCasing(query)}}
      Product.find(queryObject)
      .sort("-price")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .then(async (products, err) => {
        productResults.count = await count(queryObject);
        productResults.products = products;
        res.send(productResults);
       });
      }
      else if(sortDirection === "highest" && !query) {
        queryObject = {}
        Product.find(queryObject)
        .sort("-price")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .then(async (products, err) => {
          productResults.count = await count(queryObject);
          productResults.products = products;
          res.send(productResults);
         })
            .catch(err => err);
        }
      else if (sortDirection === "lowest" && query) {
        queryObject = { $text: {$search: toCorrectCasing(query)}}
        Product.find(queryObject)
        .sort("price")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .then(async (products, err) => {
          productResults.count = await count(queryObject);
          productResults.products = products;
          res.send(productResults);
         })
            .catch(err => err);
        }
      else if (sortDirection === "lowest" && !query) {
        queryObject = {}
        Product.find(queryObject)
        .sort("price")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .then(async (products, err) => {
          productResults.count = await count(queryObject);
          productResults.products = products;
          res.send(productResults);
         })
            .catch(err => err);
      }
      else {noPriceNoCategory()}
  }

  const filterByCategoryNoPrice = (category) => {
    if (query) {
      queryObject = {$and: [{category: toCorrectCasing(category)},
        {$text: {$search: toCorrectCasing(query)}}]}
    Product.find(queryObject)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .then(async (products, err) => {
      productResults.count = await count(queryObject);
      productResults.products = products;
      res.send(productResults);
     })
        .catch(err => err);
      }
    if (!query) {
        queryObject = {category: toCorrectCasing(category)}
        Product.find(queryObject)
        .skip(perPage * page - perPage)
        .limit(perPage)
        .then(async (products, err) => {
          productResults.count = await count(queryObject);
          productResults.products = products;
          res.send(productResults);
         })
            .catch(err => err);
          }
    }
  


  const noPriceNoCategory = async () => {

    if (query) {
       queryObject = {
        $text: {$search: toCorrectCasing(query)}
      }
    {Product.find(queryObject)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .then(async (products, err) => {
      productResults.count = await count(queryObject);
      productResults.products = products;
      res.send(productResults);
        })
        .catch(err => err);}
      }
    else {
      {Product.find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .then(async (products, err) => {
        productResults.count = await count();
        productResults.products = products;
        res.send(productResults);
          })
          .catch(err => err);}
    }
  }
  
  if (category && price) {
    sortByPriceFilterByCategory(price, category)
      }
  
  if (category && !price) {
    filterByCategoryNoPrice(category);
  }

  if (price && !category) {
    sortByPriceNoCategory(price)
  }
  // no querys
  else if (!price && !category){noPriceNoCategory();}
      });

router.get("/categories", (req, res, next) => {
  const categories = [];
  Product.find({})
  .then(products => {
    products.forEach(product => {
      const category = product.category;
      if (!categories.includes(category)){categories.push(category)};
    })
    res.send(categories);
  })
});
    

// find product by id
  router.get("/products/:product", (req, res, next) => {
      const id = req.params.product
    
      Product.find({_id: id})
        .then((products, err) => {
            res.send(products)
            })
            .catch(err => err);
        });
// todo: review how to access subdocs, paginate to 4 results per request with optional page parameter
  router.get("/products/:product/reviews", (req, res, next) => {
    const id = req.params.product
    const perPage = 4
    let startingIndex = 0
    if (req.query.page && req.query.page > 0){
      startingIndex = req.query.page * 4 
    }
    Product.find({_id: id})
      .then((product, err) => {
        const reviews = product[0].reviews
        const paginatedReviews = reviews.slice(startingIndex, (startingIndex + perPage))
          res.send(paginatedReviews);
          })
          .catch(err => err);
      });
router.post("/products", (req, res, next) => {
  let product = new Product;
  let category = req.body.category;
  let name = req.body.name;
  let price = req.body.price;
  let image = req.body.image;
  let reviews = generateFakeReviews();

  product.category = category;
  product.name = name;
  product.price = price;
  product.image = image;
  product.reviews = reviews;
  product.save();
  res.end();
})

router.post("/products/:product/reviews", (req, res, next) => {
  let review = new Review;
  review.userName = req.body.userName;
  review.text = req.body.text;
  const id = req.params.product;

  Product.find({_id: id})
        .then((products, err) => {
          products[0].reviews.push(review);
          products[0].save();
            })
            .catch(err => err);
            res.end();
        });
  router.delete("/products/:product", (req, res, next) => {
    const id = req.params.product;
    Product.findOneAndDelete({_id: id})
      .then((product, err) => {
        res.end();
      })
      
  })

  // todo: search for correct 
  router.delete("/reviews/:review", (req, res, next) => {
    const id = req.params.review;
    Product.find({})
    .then((products) => {
      products.forEach((product) => {
          const correctReviewIndex = product.reviews.indexOf((review) => {review._id == id});
          if (correctReviewIndex >= 0){
          product.reviews.splice(correctReviewIndex, 1);
          product.save()
        }
      });
      res.end();
    })
    .catch(err => console.log(err))
  });

module.exports = router;
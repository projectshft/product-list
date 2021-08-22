const router = require("express").Router();
const faker = require("faker");
const product = require("../models/product");
const Product = require("../models/product");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});


// in example: want user to be able to pass in number like:
// /products?page=3
router.get("/products", (req, res, next) => {
  let findQuery = "{}";
  let sortQuery = "{}";

  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;

  // add optional category filter: localhost:8000/products?page=1&category=tools
  const queryString = req.query;

  if (JSON.stringify(queryString).includes("category")) {
    findQuery =
      '{ "category" : "' + req.query.category.split("'").join("") + '" }';
  }

  // add optional price sort: localhost:8000/products/?price=highest (or lowest)
  // this will happen before the name addition below regardless of the order they show up in the url
  if (JSON.stringify(queryString).includes("price")) {
    if (queryString.price == "highest") {
      sortQuery = '{ "price" : -1 }';
    } else {
      sortQuery = '{ "price" : 1 }';
    }
  }

  // add optional name query: localhost:8000/products?price=lowest&query=shovel
  // should be added to findQuery if that exists, if no existing, just do it without a comma
  if (JSON.stringify(queryString).includes("query")) {
    if ((findQuery = "{}")) {
      findQuery =
        findQuery.replace("}", "") +
        '"name" : { "$regex" : "' +
        queryString.query.split("'").join("") +
        '" } }';
    } else {
      findQuery =
        findQuery.replace("}", ", ") +
        '"name" : { "$regex" : "' +
        queryString.query.split("'").join("") +
        '" } }';
    }
  }

  Product.find(JSON.parse(findQuery))
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort(JSON.parse(sortQuery))
    .exec((err, products) => {
      // Note that we're not sending 'count' back at the moment, but in the futuer we may want to know how may are coming back so we can figure out the number of pages
      Product.count().exec((err, count) => {
        if (err) return err;

        res.send([{ prod: products, number: count }]);
      });
    });
});

// API routes
// GET /products/:product: Returns a specific product by its id
router.get("/products/:product", (req, res) => {
  Product.find({ _id: req.params.product })
    .exec((err, products) => {
      if (err) return next(err);
      res.send(products);
    });
});

// GET /products/:product/reviews: Returns ALL the reviews for a product, but limited to 4 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an optional page query parameter to paginate.
router.get("/products/:product/reviews", async (req, res) => {
  const perPage = 4;

  // return the first page by default
  const page = req.query.page || 1;

  let resultArr = [];

  // if page is 2, we want review 5 - 8
  // if page is 12, we want 45 - 48: ((page-1)*4) + 1 is start page, leave off the +1 to do the index in for loop

  Product.find({ _id: req.params.product })
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);

        for (let i = ((page - 1) * 4); i < perPage * page; i++ ) {
          if (products[0].reviews[i]) {
            resultArr.push(products[0].reviews[i]);
          } else {
            resultArr.push({});
          }
          
        }

        // use 610c35bafba3781a1efb174b to test, has 5 reviews
        res.send(resultArr);
      });
    });
})

// POST /products: Creates a new product in the database
router.post("/products", async (req, res) => {
  
  const addedProduct = new Product({
    category: req.body.category,
    name: req.body.name,
    price: parseInt(req.body.price),
    reviews: []
  })

  await addedProduct.save()
  res.send(addedProduct);
});

// POST /products/:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.
router.post("/products/:product/reviews", async (req, res) => {
  const parentProduct = await Product.find({ _id: req.params.product });

  parentProduct[0].reviews.push({
    username: req.body.username,
    text: req.body.text,
  });

  await parentProduct[0].save();
  res.send(parentProduct[0]);
  // use 6111a6edc452a01a685762f8 to test
});

// DELETE /products/:product: Deletes a product by id
router.delete("/products/:product", async (req, res) => {
  await Product.deleteOne({ _id: req.params.product });
  res.send(req.params.product + "now deleted");
});

// DELETE /reviews/:review: Deletes a review by id
// //to remove a comment with a specific _id from aPost
//   aPost.comments.id(_id).remove();
router.delete("/reviews/:review", async (req, res) => {
  await Product.reviews.deleteOne( { _id: req.params.review } ); // or 

  // test with 6110591e85f9d205c11c3e50
});


module.exports = router;

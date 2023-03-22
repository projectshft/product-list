const router = require("express").Router();
const faker = require("faker");
const { Product, Author, Review } = require("../models/product");


router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    const result = product.save();
    console.log(result);
    res.end();
  }
});

//Get by Price, Category, and Name
router.get("/products", async (req, res, next) => {
  try {
    const {category, price, query} = req.query;
    const resultPerPage = 9;

    console.log(query);
    console.log(category)

    let productFilter = {};
    let priceFilter = {};

    if (category) {
      const catRegex = new RegExp(category, "i");
      productFilter.category = catRegex;
      console.log(catRegex);
    }

    if (query) {
      const queryRegex = new RegExp(query, "i");
      productFilter.name = queryRegex;
      console.log(queryRegex);
        }

    if (price === "lowest") {
      priceFilter.price = 1;
    } else if (price === "highest") {
      priceFilter.price = -1;
    }

    console.log(productFilter);
    console.log(priceFilter);

productFilter.price = {$gte: 1};

const products = await Product.find(productFilter, {}, null).sort(priceFilter).limit(resultPerPage).exec();

const response = {
  results: resultPerPage,
  products: products
};
console.log(response.products);
console.log(response.results);
res.send(response);

  } catch (err) {
    console.log(err)
    res.status(500).send({error: "Error occured during search"});
  }
})


//Gets Product by ID OK
router.get("/products/:product", async (req, res, next) => {
  try {
    const prodById = await Product.findById(req.params.product);

    if (!prodById) {
      return res
        .status(404)
        .send({ error: "404 Not Found No Product with that ID" });
    }
    res.send(prodById);
    console.log(prodById);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "error has occured" });
  }
});

//Get Product Reviews by Product ID OK
router.get("/products/:product/reviews", async (req, res, next) => {
  try {
    const prodById = await Product.findById(req.params.product);
    if (!prodById) {
      return res
        .status(404)
        .send({ error: "404 Not Found No Product with that ID" });
    }
    //Data for Result Obj
    const pageNumber = parseInt(req.query.page) || 1;
    const reviewNumber = 4;
    const start = (pageNumber - 1) * reviewNumber;
    const end = start + reviewNumber;
    const allReviews = prodById.reviews.slice(start, end);
    //Result  Obj
    const result = {
      page: pageNumber,
      onPage: reviewNumber,
      reviews: allReviews,
    };
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Error Occured" });
  }
});

//Post Product OK
router.post("/products", async (req, res, next) => {
  try {
    console.log("body", req.body);
    //From page to Post
    const toPost = req.body;
    console.log("ToPost:", toPost);
    const product = new Product(toPost);
    //Save product to DB
    product.save();
    console.log(product);

    res.status(201).send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Error" });
  }
});

//Post Review POSTING review having a hard time getting name
router.post("/products/:product/reviews", async (req, res, next) => {
  try {
    const prodById = await Product.findById(req.params.product);
    const { review, author } = req.body;

    if (!prodById) {
      return res
        .status(404)
        .send({ error: "404 Not Found No Product with that ID" });
    }
    console.log("ProductBefore", prodById);
    console.log("body", req.body);

    const authorToPost = new Author({
      name: author,
      review: [],
    });

    const reviewToPost = new Review({
      review,
      name: authorToPost,
      product: prodById,
    });

    console.log("Review to POST", reviewToPost);
    console.log("Author", authorToPost);
    reviewToPost.save();
    authorToPost.save();

    prodById.reviews.push(reviewToPost);
    authorToPost.review.push(reviewToPost);

    console.log("product aftersave", prodById);
    await prodById.save();

    const getName = await Review.findById(reviewToPost._id).populate("name");

    res.status(201).send({ review: getName, author: authorToPost });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Error Occured" });
  }
});

//Delete Product by ID OK but POSTMAN took time
router.delete("/products/:product", async (req, res, next) => {
  try {
    const prodById = await Product.findByIdAndRemove(req.params.product);
    if (!prodById) {
      return res
        .status(404)
        .send({ error: "404 Not Found No Product with that ID" });
    }
    res.status(200).send({ message: "Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Error Occured" });
  }
});

module.exports = router;

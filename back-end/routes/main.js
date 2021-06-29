const router = require('express').Router();
const faker = require('faker');
const Products = require('../models/products');
const Reviews = require('../models/reviews');

// gets product by product id
router.get('/products/:productId', async (req, res) => {
  const passedInId = req.params.productId;

  const dbQuery = await Products.find(
    { _id: passedInId },
    (err, product) => err || product
  );
  res.json(dbQuery);
});

// gets the review for that product id
router.get('/products/:product/reviews', (req, res) => {
  Products.findOne({ _id: req.params.product })
    .populate('reviews')
    .exec((err, product) => {
      res.json(product);
    });
});

// posts the product to the database
router.post('/product', (req, res) => {
  const newProduct = new Products({
    category: req.body.catagory,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
  });
  console.log(req);
  newProduct.save((err) => err || console.log('Save is a Success'));
});

// deletes product by id
router.delete('/products/:productId', (req, res) => {
  const { productId } = req.params;

  Products.deleteOne({ _id: productId }, (err) =>
    err
      ? console.log(`Cast Error: No product with that ID`)
      : console.log('success')
  );
});

// posts a review to the product
router.post('/products/:product/reviews', (req, res) => {
  const reviewBody = req.body;
  const product = Products.findById(
    req.params.product,
    (err, productToReturn) => err || productToReturn
  );

  product.exec().then((product) => {
    const review = new Reviews({
      userName: reviewBody.userName,
      text: reviewBody.text,
      productId: product._id,
    });
    review.save();
    product.reviews.push(review);
    product.save();
    res.json([product, review]);
  });
});

// deletes a review by its id
router.delete('/reviews/:review', (req, res) => {
  Reviews.deleteOne({ _id: req.params.review }, (err) =>
    err
      ? console.log(`Cast Error: No review with that ID`)
      : console.log('success')
  );

  res.status(200).end();
});

// gets products based on query parameters
//   /products?page=3&category=games&sort=highest&name=anynameformat
router.get('/products', async (req, res, next) => {
  let sort;

  // conditional to set price sort
  if (req.query.sort) {
    if (req.query.sort === 'highest') sort = -1;
    if (req.query.sort === 'lowest') sort = 1;
  }

  // object options for query
  const options = {
    pageNum: parseInt(req.query.page) || 1,
    name: req.query.name || '',
    category: req.query.category || '',
    sort,
    limit: 9,
  };

  // a helper for Product.find()
  const query = {
    category: { $regex: options.category, $options: 'i' },
    name: { $regex: options.name, $options: 'i' },
  };

  // if the request has a category truthy or a name truthy
  if (req.query.category || req.query.name) {
    // querying DB for the documents based on search, getting back docs, total docs, categories, current page number, total pages
    const [docs, totalDocs, categories] = await Promise.all([
      Products.find(
        {
          category: query.category,
          name: query.name,
        },
        { reviews: 0 }
      )
        .sort({ price: options.sort })
        .skip(options.limit * options.pageNum - options.limit)
        .limit(options.limit),

      Products.find(
        {
          name: query.name,
          category: query.category,
        },
        { reviews: 0 }
      ).countDocuments(),

      // gets the categories only
      Products.distinct('category'),
    ]);

    // rounding up for total pages we will have for FE pagiination
    const totalPages = Math.ceil(totalDocs / options.limit);

    res
      .status(200)
      .json([docs, totalDocs, totalPages, categories, options.pageNum])
      .end();
  }

  // if there is no name or category query then run this code
  else {
    const [docs, totalDocs, categories] = await Promise.all([
      Products.find({}, { reviews: 0 })
        .sort({ price: options.sort })
        .skip(options.limit * options.pageNum - options.limit)
        .limit(options.limit),

      Products.find(
        {
          name: query.name,
        },
        { reviews: 0 }
      ).countDocuments(),

      Products.distinct('category'),
    ]);

    const totalPages = Math.ceil(totalDocs / options.limit);

    res
      .status(200)
      .json([docs, totalDocs, totalPages, categories, options.pageNum])
      .end();
  }
});

module.exports = router;

// // generates fake data
// router.get('/generate-fake-data', (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     const product = new Product();

//     product.category = faker.commerce.department();
//     product.name = faker.commerce.productName();
//     product.price = faker.commerce.price();
//     product.image = 'https://via.placeholder.com/250?text=Product+Image';
//     product.reviews = [];

//     product.save((err) => {
//       if (err) throw err;
//     });
//   }
// });

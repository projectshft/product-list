const router = require("express").Router();
const faker = require("faker");
const { isValidObjectId } = require("mongoose");
const Product = require("../models/product");
const Review = require("../models/reviews")

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

//hardcode some reviews
const fakeReviews = [
  {
    userName: "Peter",
    text: "Received this as a gift for my 18th birthday. As soon as I touched it, I grew a moustache.",
    product: "613a801b5ffb141a09d37b1c"
  },
  {
    userName: "Parker",
    text: "One of the greatest inventions of all time. It saved my marriage.",
    product: "613a801b5ffb141a09d37b1c"
  },
  {
    userName: "Mary",
    text: "Great product, but the packaging could be better",
    product: "613a801b5ffb141a09d37b1c"
  },
  {
    userName: "Jane",
    text: "Ever since buying this product, I've lived my life in peace and safety.",
    product: "613a801b5ffb141a09d37b1c"
  },
  {
    userName: "Watson",
    text: "Worked as described. All you can ask for.",
    product: "613a801b5ffb141a09d37b1c"
  }
]
//update a product to have the reviews
router.post("/generate-fake-reviews/:id", (req, res, next) => {
  Product.findByIdAndUpdate(
    {_id: req.params.id},
    {reviews: fakeReviews},
    function (err, product) {
    if (err) {
      return res.send(err);
    } else {
      res.send(product);
    }
  });
});

router.get("/products", (req, res, next) => {
  const perPage = 9;

  const page = req.query.page || 1;
  const category = req.query.category || null;
  const prices = req.query.price || "";
  const query = req.query.query || ""

  let find = Product;

  if (category) {
   let formatCategory = category.charAt().toUpperCase() + category.substring(1).toLowerCase();

   find = find.find({category: formatCategory})
  };

  if (!category) {
    find = find.find({})
  }

  if (prices) {
    if (prices === "highest") { 
      sort = -1
    } else if (prices === "lowest") {
      sort = 1
    } else { 
      sort = null
    };
    find = find.sort({price: sort})
  }

  if (query) {
    find = find.find({name: {$regex: query, $options: "i"}})
  }

  find
    .skip(perPage*page-perPage)
    .limit(perPage)
    .exec((error, products) => {
      Product.count().exec((err, count) => {
      if(err) return next(err);

      res.send(products);
    });
  });
});


// if (!category) {
//   findProduct
//   .sort({price: sort})
//   .skip(perPage*page-perPage)
//   .limit(perPage)
//   .exec((error, products) => {
//     Product.count().exec((err, count) => {
//     if(err) return next(err);

//     res.send(products);
//   });
// });
// } else {
//   const formatCategory = category.charAt().toUpperCase() + category.substring(1).toLowerCase()

//   Product.find({category: formatCategory})
//   .sort({price: sort})
//   .skip(perPage*page-perPage)
//   .limit(perPage)
//   .exec((error, products) => {
//     Product.count().exec((err, count) => {
//     if(err) return next(err);

//     res.send(products);
//   });
//   });
// }
// });


router.get("/product/:id", (req, res, next) => {
  Product.findById(req.params.id, (err, product) =>{
    if (err) return next(err);
    res.send(product);
  });
});

//returns reviews, but not 4 at a time
router.get("/product/:id/reviews", (req, res, next) => {
  // const perPage = 4;

  // const page = req.query.page || 1;
  // const reviews = Product.findById(req.params.id).reviews
  // reviews
  // .skip(perPage*page-perPage)
  // .limit(perPage)
  // .exec((error, reviews) => {
  //   Product.count().exec((err, count) => {
  //   if(err) return next(err);

  //   res.send(reviews);


  Product.findById(req.params.id, (err, product) => {
    if (err) return next(err);
    res.send(product.reviews);
    });
  // });
});

//adds new product to database
router.post("/products", (req, res, next) => {
  let product = new Product({
    category: req.query.category,
    name: req.query.name,
    price: req.query.price,
    image: "https://via.placeholder.com/250?text=Product+Image",
    reviews: [],
  });
  product.save((err, newProduct) => {
    if (err) return next(err);
    res.send(newProduct);
  });
});


//adds new review to product based on id
router.post("/products/:id/reviews", (req, res, next) => {
  let review = new Review({
    userName: req.query.userName,
    text: req.query.text,
    product: req.params.id
  });
  review.save()
  Product.findByIdAndUpdate(
    {_id: req.params.id},
    {$push: {reviews: review}},
    function (err, product) {
    if (err) {
      return res.send(err);
    } else {
      res.send(product.reviews);
    }
  });
});

//deletes a product by id
router.delete("/products/:id", (req, res, next) => {
  Product.deleteOne({_id:req.params.id}, (err, product) => {
    if (err) throw err;
    console.log('deleted product');
    res.send(product);
  });
});

//deletes a review by id
router.delete("/reviews/:id", (req, res, next) => {
  Review.findById(req.params.id, (err, review) => {
    if (err) throw err;
    Product.findOneAndUpdate(
      review.product,
      {$pull: {reviews: {_id: review._id}}},
      function(err, data){
        console.log(err, data)
      }
    ) 
  });
  
  Review.deleteOne({_id: req.params.id}, (err, review) => {
    if (err) throw err;
    console.log('deleted review from collection');
   
    res.send(review)
  });
});

module.exports = router;
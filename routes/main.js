const router = require("express").Router();
const {faker} = require("@faker-js/faker");
const MyProducts = require("../models/myProducts");
const Reviews = require('../models/reviews')

//LOAD DB WITH FAKE DATA 
// router.get("/generate-fake-data", (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let myProducts = new MyProducts();

//     myProducts.category = faker.commerce.department();
//     myProducts.name = faker.commerce.productName();
//     myProducts.price = faker.commerce.price();
//     myProducts.image = "https://via.placeholder.com/250?text=Product+Image";

//     myProducts.save((err) => {
//       if (err) throw err;
//     });
//   }
//   res.end();
// });


//IMPLEMENT PAGINATION 
router.get("/myProducts", (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;

  MyProducts.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, myProducts) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      MyProducts.count().exec((err, count) => {
        if (err) return next(err);

        res.send(myProducts);
        });
        console.log(myProducts)
    });
});

//CREATE NEW PRODUCT
// router.post('/myProducts', (req, res) => {
// let newProduct = new MyProducts({
//   category: 'Health',
//   name: 'Cool Purple Medicine Ball',
//   price: 25,
//   image: 'https://via.placeholder.com/250?text=Product+Image',
//   reviews: [],
// })
// newProduct.save()
// .then(product => {
//   res.send('product saved to db');
// })
// .catch(err => {
//   res.status(400).send('unale to save to database');
// });
// });


// let newProductReview = new Reviews({
//   userName: 'jillannette',
//   reviewText: 'Great medicine ball for the price!',
//   product: newProduct._id,
// });

// newProduct.save();
// newProductReview.save();
// newProduct.reviews.push(newProductReview);
// newProduct.save();

// MyProducts.deleteOne({ _id: '63c16a28ab27e346bb0ac991' }, function (err) {
//   if (err) console.log(err);
//   console.log('Successfully deleted')
// })

// MyProducts.deleteOne({_id: '63c16a28ab27e346bb0ac990'}, function (err) {
//   if (err) console.log(err);
//   console.log('successfully deleted')
// })

module.exports = router;
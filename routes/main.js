const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/reviews')

//code to generate new products in database. Added new image as one from assignment wasn't working

// router.get('/generate-fake-data', (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product()

//     product.category = faker.commerce.department()
//     product.name = faker.commerce.productName()
//     product.price = faker.commerce.price()
//     product.image = 'https://www.digitalcitizen.life/sites/default/files/styles/img_amp/public/featured/2016-08/photo_gallery.jpg'
//     product.reviews = []  

//     product.save((err) => {
//       if (err) throw err
//     })
//   }
//   res.end()
// })



//GET all products

//Optional param: page number, will default to the first page if none selected
//Optional param: sort by category (localhost:8000/products?page=1&category=tools)
//Optional param: sort by highest or lowest
//localhost:8000/products?page=1&category=tools&price=highest
//localhost:8000/products?page=1&category=tools&price=lowest
//limits results to 9 per page
router.get('/products', (req, res, next) => {
    const category = req.query.category
    const query =req.query.query
    const sort = req.query.price
    //TODO have sort reflect "highest/lowest" instead of "asc/desc"

    const perPage = 9
  
    // return the first page by default
    const page = req.query.page || 1

    var conditions = {} //empty container to be able to account for various combinations of queries possible
 
    if (category && query) {
      conditions = {
        $and : [
          {category:category}, {name: { $regex: query, $options: "i" } }//returns names containing the query (doesn't have to be direct match)
        ]
      }

    } else if (query && !category) {
      conditions = {name: { $regex: query, $options: "i" } }

    } else if (!query && category)
      conditions = {category:category}

    let base = Product.find(conditions).sort({price:sort}).skip((perPage * page) - perPage).limit(perPage)
    return base.exec((err, products) => {
         
          base.countDocuments().exec((err, count) => {
            res.send(products)
            console.log(count)
          })
      })
   
  })

//GETS a product by its id
//REQUIRES ID in url params
router.get('/products/:product', (req, res) => {
    const { product } = req.params
   
    // const productToReturn = req.query.product

    Product
      .findById(product)
      // .populate('Review')
      .exec((err, product) => {
        if (err) {
            return console.error(err);
        }
        res.send(product)
    })
})

//POSTS a new product in the database with pbody paramters provided
//REQUIRES category, name, price, image in the body params
router.post('/products', (req, res) => {
    const category = req.body.category
    const name = req.body.name
    const price = req.body.price
    const image = req.body.image

    let product = new Product(
      {
        category: category,
        name: name,
        price: price,
        image: image, 
        reviews: []
      }
    )
    product.save()
    // res.send(product)// dont need this, just checking it out 
})

// POSTS a new review to a selected product
//REQUIRES product id in url and username and text in post body
//needs edge cases for if the body doesn't contain username & text
router.post('/products/:product/reviews', (req, res) => {
    const { product } = req.params
    const username = req.body.username
    const text = req.body.text

    Product
      .findById(product) //find the product by the id in the url
      .populate('reviews') //populate the review schema
      .exec((err, product) => {
      if (err) {
          return console.error(err);
      }

      let review = new Review(//create a new review based on the review schema including the post body and the product id
        {
          userName: username,
          text: text,
          product: product._id
        }
      )
    
    review.save()
    product.reviews.push(review) //push the new review to the product review array
    product.save() //save the product with the new review
    res.send(review) //

  })
})

//GETS reviews for designated product
//REQUIRES product id in the url and optional page in query
// /products/reviews?page=3
router.get('/products/:product/reviews', (req, res) => {
  const { product } = req.params

  const perPage = 4

  const page = req.query.page || 1 //takes the optional page number in the query or defaults to the first page
  

  Product.findById(product)
    .skip((perPage * page) - perPage) 
    .limit(perPage)
    .populate('reviews')
    .exec((err, product) => {
      if (err) {
        console.error(err);
      } else {
        res.send(product);
      }
    })

})

//DELETE product by id
//REQUIRES id in url
router.delete('/products/:product', (req, res) => {
  const { product } = req.params

  Product.findByIdAndDelete(product)
  .exec((err, product) => {
    if (err) {
      console.error(err);
    } else {
      console.log("product deleted");
    }
  })
})


//DELETE review by id
//requires id in url
router.delete('/reviews/:review', (req, res) => {
  const { review } = req.params

  Review.findByIdAndDelete(review) //deletes are updated in postman but not in compass?
  .exec((err, review) => {
    if (err) {
      console.error(err);
    } else {
      Product.findById(review.product)//not working. Intend to select the above product associated with the review and remove the review
      .exec((err, product) => {
        if (err) {
          console.error(err);
        } else {
          review.remove()
          product.save()
          console.log(review)
        }
      })
    }
  })
})




module.exports = router
const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
// const Review = require('../models/review')


router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})



// router.get('/generate-fake-data', (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product()

//     product.category = faker.commerce.department()
//     product.name = faker.commerce.productName()
//     product.price = faker.commerce.price()
//     product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

//     product.save((err) => {
//       if (err) throw err
//     })

//   }
//   res.end()
// })

// module.exports = router

// router.get('/generate-fake-data', (req, res, next) => {

//   for (let i = 0; i < 90; i++) {
//     let product = new Product()
    
//     for (let j = 0; j < faker.random.number(1); j++) {
//       let review = new Review()

//       review.userName = faker.internet.userName()
//       review.text = faker.lorem.sentences()
//       review.product = product._id
//       review.save((err) => {
//         if (err) throw err
//       })
//       product.reviews.push(review)
//     }

//     product.category = faker.commerce.department()
//     product.name = faker.commerce.productName()
//     product.price = faker.commerce.price()
//     product.image = 'https://payload.cargocollective.com/1/16/530262/11823255/Itsthevibe---Image-not-found_3984.JPG'

//     product.save((err) => {
//       if (err) throw err
//     })
//   }
//   res.end()
// })

  // get ALL products
  router.get('/products', (req, res, next) => {
    const perPage = 9
    // return the first page by default
    const page = req.query.page || 1
    const productCategory = req.query.category;
    const sort = req.query.price;

  //setting state
    let searchQuery = {}
    let sortQuery = {}

    if (productCategory) {
        searchQuery = {category: productCategory}}
  //price sorting function
    if (sort === 'highest') {
      sortQuery = { price: 'descending' }
    } if (sort === 'lowest') {
        sortQuery = { price: 'ascending' }
    }
  
    Product
      .find(searchQuery)
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .sort(sortQuery)
      .exec((err, products) => {
          // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back

        Product.count().then((count) => {
          if (err) { return next(err)} 
          else {res.send(products)}
        })
      })
  });
  
  router.get('/products/:product', (req, res, next) => {
    Product
      .findById(req.params.id, (err, product) => {
        if (!err) {
          res.send(product);
        } else {
            return res.status(404).send('Product not found.')
        }
      })
  });

  router.post('/products', (req, res, next) => {
  
    const newProduct = new Product({
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      reviews: []
    })
  
    newProduct.save((err) => {
      if (err) throw err
    })
    res.send(newProduct)
  });
  
  // creates new review for specific product
  router.post('/:product/reviews', (req, res, next) => {
    Product
      .findById(req.params.id)
      .exec((err, product) => {
    
        const newReview = new Review({
          userName: req.body.userName,
          text: req.body.text,
          product: req.params.productId
        })
        newReview.save((err) => {
          if (err) throw err 
        })
        //push to arrays created above
        product.reviews.push(newReview)
        product.save()
        res.send(newReview)
      })
  });
  
 
  router.delete('/products/:product', (req, res) => {
    Review
      .findByIdAndRemove(req.params.id)
      .exec((err, product) => {
        if (err) throw err 
        else res.send(product)
      })
  })
  
  router.get('/reviews', (req, res) => {
    const perPage = 40
    const page = req.query.page || 1
  
    Review
      .find()
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, reviews) => {
        if (err) throw err
        else res.send(reviews)
      })
  })


router.delete('/reviews/:review', (req, res, next) => {
  Review
    .findById(req.params.id)
    .exec((err, review) => {
        if (err) throw err
        else review.remove();
      })
      
});

module.exports = router
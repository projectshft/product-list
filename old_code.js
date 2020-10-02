//original paginating search 
router.get('/products', (req, res, next) => {
  console.log(`query is  ${req.query.page}`)
  // return the first page by default
  req.query.page = req.query.page || 1

   Product
    .find({})
    .skip((req.query.page-1)*10)
    .limit(10)
    .exec((error, products) => {
      console.log(res.toString())
      res.send(products)
  })
})


// snippets

router.get('/newroute', (req, res, next) => {
  if (err) return next(err)
  res.send(/*response*/)
})
// example product
// {"_id":{"$oid":"5f7616c77b108078742fc9cf"},"category":"Kids","name":"Intelligent Fresh Chair","price":660,"image":"https://via.placeholder.com/250?text=Product+Image","__v":0}
// {"_id":{"$oid":"5f7616c77b108078742fc9b7"},"category":"Clothing","name":"Practical Fresh Ball","price":22,"image":"https://via.placeholder.com/250?text=Product+Image","__v":0}
// {"_id":{"$oid":"5f7616c77b108078742fc9bc"},"category":"Health","name":"Handmade Fresh Soap","price":543,"image":"https://via.placeholder.com/250?text=Product+Image","__v":0}
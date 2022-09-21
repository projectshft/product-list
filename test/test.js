const {describe, expect, test} = require('@jest/globals')
const request = require('supertest')
const server = require('../server')

describe('products', () =>{
  it('GET /products --> return array of products', async (done) =>{
    await request(server)
      .get('/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .then( async (res) => {
        res.body.length = 9
      })
      .end((err, res) => {
        if(err) return done(err)
        return done()
      })
      })

  it('POST /products --> add single product', () => {
    const data = {
      category:"Computers", 
      name:"Test Computer Product", 
      price: 17000, 
      image: "https://via.placeholder.com/250?text=Product+Image", 
      reviews: []
    }
    request(server)
    .post('/products')
    .expect("Content-Type", /json/)
    .send(data)
    .expect(200)
  })
  it('GET /products/:productId --> return single product', () =>{
    const productId = '63247036f75074b21138a960'
    request(server)
      .get(`/products/${productId}`)
      .expect('Content-Type', /json/)
      .expect(200)
  })
  it('DELETE /products/:productId --> remove single product', () =>{
    const productId = '6328751569882d47ea47e92d'
    request(server)
      .get(`/products/${productId}`)
      .expect(204)
  })
})

describe('reviews', () =>{
  it('GET /products/:productId/reviews --> return array of reviews for a single product', (done) => {
    const productId = '63247036f75074b21138a955'
    const reviewId = '63247036f75074b21138a956'
    request(server)
      .get(`/products/${productId}/reviews/${reviewId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) return done(err)
        return done()
      })
  })
  it('POST /products/:productId/reviews --> add new review for a single product', () => {})
  it('DELETE /products/:productId/reviews --> delete review for a single product', () => {})
})
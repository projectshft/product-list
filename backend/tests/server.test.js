const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
chai.should();

let productId = '';
let reviewId = '';

const testProduct = { 
  name: 'coffee', 
  price: '5', 
  category: 'beverage', 
  image: 'https://via.placeholder.com/250?text=Product+Image' 
};

const testReview = {
  username: 'reacher',
  text: 'I love coffee.'
}

/**Testing API calls related to products*/
describe('Products', () => {
  describe('/GET products', () => {
    /**Successful get products*/
    it('should return all products (limited to 9)', done => {
      chai.request(server)
        .get('/products')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.resultsLimited.length.should.be.eq(9);
          productId = res.body.resultsLimited[0]._id; // Store productId of 1st result for other tests
          done();
        });
    });
  });
  describe('/GET single product', () => {
    /**Successfully get a single product*/
    it('should return one product', done => {
      chai.request(server)
        .get(`/products/${productId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('category');
          res.body.should.have.property('price');
          res.body.should.have.property('image');
          res.body.should.have.property('reviews');
          done();
        });
    });
  });
  describe('/GET product reviews', () => {
    /**Successfully get a product's reviews*/
    it('should return a product\'s reviews array (limited to 4)', done => {
      chai.request(server)
        .get(`/products/${productId}/reviews`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('/POST product', () => {
    /**Successfully add a product to the DB*/
    it('should add a new product to the products DB and return 201', done => {
      chai.request(server)
        .post('/products')
        .send(testProduct)
        .end((err, res) => {
          // console.log(res.body);
          res.should.have.status(201);
          productId = res.body.product._id;
          done();
        });
    });
  });
  describe('/POST review', () => {
    /**Successfully add a review to a product*/
    it('should add a new review to a product and return 201', done => {
      chai.request(server)
        .post(`/products/${productId}/reviews`)
        .send(testReview)
        .end((err, res) => {
          res.should.have.status(201);
          reviewId = res.body._id; // Save newly created reviewId for future tests
          done();
        });
    });
  });
  describe('/DELETE a product review', () => {
    /**Successfully remove a product review*/
    it('should delete a review and return status 204', done => {
      chai.request(server)
        .delete(`/products/${productId}/reviews/${reviewId}`)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
  describe('/DELETE a product', () => {
    /**Successfully remove an entire product*/
    it('should delete a product and return status 204', done => {
      chai.request(server)
        .delete(`/products/${productId}`)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
});
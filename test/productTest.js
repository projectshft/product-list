const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.should();
chai.use(chaiHttp);

const Product = require('../models/product');

describe('Products', () => {
  describe('/GET products', () => {
    it('should get an array of all the products', (done) => {
      chai
        .request(app)
        .get('/products')
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.an('array');
          response.body.length.should.be.above(0);
          done();
        });
    });
    it('should get 1 page of 9 products', (done) => {
      chai
        .request(app)
        .get('/products?page=3')
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.an('array');
          response.body.length.should.be.eql(9);
          done();
        });
    });
    // it('should return error if page is too high', (done) => {
    //   chai
    //     .request(app)
    //     .get('/products?page=34382074839024')
    //     .end((error, response) => {
    //       response.should.have.status(404);
    //     });
    // });
  });

  describe('GET products/productId', () => {
    it('should return a single product if given correct productId', (done) => {
      const productId = '62363fd4f3dcee005debc4cf';

      chai
        .request(app)
        .get(`/products/${productId}`)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.body._id.should.be.eql(productId);
          done();
        });
    });
    it('should return a 404 if given incorrect productId', (done) => {
      const productId = 'hebegebes';

      chai
        .request(app)
        .get(`/products/${productId}`)
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('POST /products', () => {
    it('should add a product to the database', (done) => {
      const productToAdd = new Product();

      productToAdd.category = 'things';
      productToAdd.name = 'super dope thing';
      productToAdd.price = '350';
      productToAdd.image = 'https://via.placeholder.com/250?text=Product+Image';

      chai
        .request(app)
        .post('/products')
        .send({ productToAdd })
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.body.name.should.be.eql(productToAdd.name);
          Product.deleteOne({ name: 'super dope thing' });
          done();
        });
    });
  });
});

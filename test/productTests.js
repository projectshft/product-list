const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const app = require('../server');

chai.should();
chai.use(chaiHttp);

const testProduct = {
  category: 'things',
  name: 'super dope thing',
  price: '350',
  image: 'https://via.placeholder.com/250?text=Product+Image',
};

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

  describe('GET products/:productId', () => {
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
      chai
        .request(app)
        .post('/products')
        .send({ testProduct })
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.body.name.should.be.eql(testProduct.name);
          testProduct._id = response.body._id;
          done();
        });
    });
    it('should return 400 if product already exists', (done) => {
      chai
        .request(app)
        .post('/products')
        .send({ testProduct })
        .end((error, response) => {
          response.should.have.status(400);
          done();
        });
    });
  });

  describe('DELETE /products/:productId', () => {
    it('should delete a product from the database by id', (done) => {
      const idToDelete = testProduct._id;
      chai
        .request(app)
        .delete(`/products/${idToDelete}`)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.eql({});
          done();
        });
    });
    it('should return 400 if product does not exist', (done) => {
      const falseIdToTest = mongoose.Types.ObjectId('51bb793aca2ab77a3200000d');
      chai
        .request(app)
        .delete(`/products/${falseIdToTest}`)
        .end((error, response) => {
          response.should.have.status(400);
          done();
        });
    });
  });
});

const chai = require('chai');
const chaiHttp = require('chai-http');
// const mongoose = require('mongoose');

const app = require('../server');

chai.should();
chai.use(chaiHttp);

const productId = '62363fd4f3dcee005debc4cf';
const badProductId = 'hebegebes';
const testReview = {
  username: 'Dwigt',
  text: "It's D-W-I-G-H-T, not Dwigt!",
};

describe('Reviews', () => {
  describe('GET products/:productId/reviews', () => {
    it('should return an array of reviews from a product document specified by productId', (done) => {
      chai
        .request(app)
        .get(`/products/${productId}/reviews`)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.an('array');
          done();
        });
    });

    it('should return a 404 if given incorrect productId', (done) => {
      chai
        .request(app)
        .get(`/products/${badProductId}/reviews`)
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('POST /products/:productId/reviews', () => {
    it('should add a review to a product specified by productId', (done) => {
      chai
        .request(app)
        .post(`/products/${productId}/reviews`)
        .send({ testReview })
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.body.text.should.be.eql(testReview.text);
          testReview._id = response.body._id;
          done();
        });
    });
  });

  describe('DELETE /products/:productId/reviews', () => {
    it('should delete a review from the product doc by id', (done) => {
      const reviewIdToDelete = testReview._id;
      chai
        .request(app)
        .delete(`/products/${productId}/reviews`)
        .send({ reviewIdToDelete })
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
});

const chai = require('chai');
const chaiHttp = require('chai-http');
// const mongoose = require('mongoose');

const app = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Reviews', () => {
  describe('GET products/:productId/reviews', () => {
    it('should return an array of reviews from a product document specified by productId', (done) => {
      const productId = '62363fd4f3dcee005debc4cf';

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
      const productId = 'hebegebes';

      chai
        .request(app)
        .get(`/products/${productId}/reviews`)
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});

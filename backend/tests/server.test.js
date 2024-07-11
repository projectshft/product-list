const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
chai.should();

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
          done();
        });
    });
  });
});
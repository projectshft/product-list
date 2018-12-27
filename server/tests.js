const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('./server');
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiHTTP);
chai.use(require('chai-sorted'));

describe('/get generate fake data', () => {
  it.only('should generate fake products', done => {
    chai
    .request(app)
    .get('/api/generate-fake-data')
    .end((err, res) => {
      assert.isNotNull(res.body);
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect("Content-Type", 'application/json');
      done();
    })
  })
})

describe('/get products', () => {
  it.only('should GET all products', done => {
    chai
    .request(app)
    .get('/api/products')
    .end((err, res) => {
      assert.isNotNull(res.body);
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect("Content-Type", 'application/json');
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(9);
      done();
    })
  })
})

describe('/get reviews', () => {
  it.only('should GET all reviews', done => {
    chai
    .request(app)
    .get('/api/reviews')
    .end((err, res) => {
      assert.isNotNull(res.body);
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect("Content-Type", 'application/json');
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(40);
      done();
    })
  })
})

describe('/get products/:product', () => {
  it.only('should get one product', done => {
    //how do i get this to work???
    chai
    .request(app)
    .get('/api/products/5c1d4ef7dac74071f15619a0')
    .end((err, res) => {
      assert.isNotNull(res.body);
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect("Content-Type", 'application/json');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('category');
      expect(res.body.category).to.be.a('string');
      expect(res.body).to.have.property('name');
      expect(res.body.name).to.be.a('string');
      expect(res.body).to.have.property('image');
      expect(res.body.image).to.be.a('string');
      expect(res.body).to.have.property('price');
      expect(res.body.price).to.be.a('number');
    })
  })
})

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const should = chai.should();
chai.use(chaiHttp);

describe('Products', () => {
  describe('/GET products', () => {
    it('should GET all the products', (done) => {
      chai.request(app)
        .get('/api/products')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(9);
          done(err);
        });
    });
    it('should GET specific product by id', (done) => {
      chai.request(app)
        .get('/api/products/2')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql('Fantastic Cotton Gloves');
          done(err);
        });
    });
    it('should GET all the reviews for a product', (done) => { 
      chai.request(app)
        .get('/api/products/1/reviews')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(5);
          res.body[0].should.have.property('userName').eql('Peter_Kuhn');
          done(err);
        });
    });
  });
  describe('/POST products', () => {
    it('should POST a product', (done) => {
      const product = {
        category: 'Toys',
        name: 'Toy Car',
        price: 10,
        image: 'https://via.placeholder.com/250?text=Product+Image',
        reviews: [{userName: 'John Doe', text: 'Great product!'}, {userName: 'Jane Doe', text: 'Terrible product!'}]
      };
      chai.request(app)
        .post('/api/products')
        .send(product)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql('Toy Car');
          done(err);
        });
    });
    it('should POST a review for a product', (done) => {
      const review = {
        userName: 'John Doe',
        text: 'Great product!',
        product: '65dfd1fa54d7d52a5c82e39b'
      };
      chai.request(app)
        .post('/api/products/65dfd1fa54d7d52a5c82e39b/reviews')
        .send(review)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('text').eql('Great product!');
          done(err);
        });
    });
  });
  describe('/DELETE products', () => {
    it('should DELETE a product', (done) => {
      chai.request(app)
        .delete('/api/products/65dfd1fa54d7d52a5c82e39b')
        .end((err, res) => {
          res.should.have.status(200);
          done(err);
        });
    });
    it('should DELETE a review for a product', (done) => {
      chai.request(app)
        .delete('/api/reviews/65dfd1fa54d7d52a5c82e39b')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.reviews.length.should.be.eql(4);
          done(err);
        });
    });
  });
});
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server"); 
const should = chai.should();
const Product = require('../models/product');
const { find } = require("../models/review");


chai.use(chaiHttp);

describe('Products and Reviews', () => {
  describe('POST /products', () => {
    it('should post the new product and return the posted product', (done) => {
      chai
        .request(app)
        .post('/products')
        .end((err, res) => {
          res.should.have.status(201);
          done();
        })
    });

    it('should appear in the products db', (done) => {
      let addedProduct = null;
      let productName = "Connor's Product";

      const findProduct = async () => {
        await Product.findOne({name: productName})
          .then((product) => {
            addedProduct = product
          });
      }

      findProduct();

      chai
        .request(app)
        .post('/products')
        .end((err, res) => {
          res.body.should.have.property('name').equal(productName)
          done();
        })
    });

  });
})
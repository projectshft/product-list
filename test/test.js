const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server"); 
const should = chai.should();
const expect = chai.expect;
const Product = require('../models/product');
const Review = require('../models/review');
const faker = require("faker");
const product = require("../models/product");


chai.use(chaiHttp);

describe('Products and Reviews', () => {
  describe('POST /products', () => {
    it('should post the new product and return the posted product', (done) => {
      const productToAdd = {
        category: faker.commerce.department(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: "https://via.placeholder.com/250?text=Product+Image",
        reviews: [],
      }
      

      chai
        .request(app)
        .post('/products')
        .send(productToAdd)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        })
    });

    it('should appear in the products db', (done) => {
      const productToAdd = {
        category: faker.commerce.department(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: "https://via.placeholder.com/250?text=Product+Image",
        reviews: [],
      }

      chai
        .request(app)
        .post('/products')
        .send(productToAdd)
        .end((err, res) => {
          if(err) {
            done(err);
          }
          Product.findOne({name: productToAdd.name})
            .then((addedProduct) => {
              res.body.should.have.property('name').equal(addedProduct.name);
              done();
            })
        });
    });

  });

  describe('POST /products/:product/reviews', () => {
    it('Should post a new review to the reviews db', async () => {
      let product = await getRandomProduct();
      let productId = product._id;

      let reviewToAdd = {
        username: faker.lorem.word(),
        text: faker.lorem.sentence(),
      };

      chai
        .request(app)
        .post(`/products/${productId}/reviews`)
        .send(reviewToAdd)
        .end((err, res) => {
          Review.findOne({name: reviewToAdd.username})
            .then((addedRev) => {
              res.should.have.status(201);
              res.body.should.have.property('product').equal(productId);
              res.body.should.have.property('username').equal(addedRev.username)
            });
        })
    });

    it('Should be able to retrieved in the products review', async () => {
      let product = await getRandomProduct();
      let productId = product._id;
      let reviewToAdd = {
        username: faker.lorem.word(),
        text: faker.lorem.sentence(),
      };
      let reviewData;

      chai
        .request(app)
        .post(`/products/${productId}/reviews`)
        .send(reviewToAdd)
        .end((err, res) => {
          reviewData = res.body;

          chai
            .request(app)
            .get(`/products/${productId}/reviews`)
            .end((err, res) => {
              const product = res.body.find((rev) => rev.text === reviewData.text);
             expect(product).to.be.true;
          })
        });

    });

  });

  describe('DELETE /products/:product', () => {
    it('Should delete the product from the db based on id', async () => {
      let product = await getRandomProduct();
      let productId = product._id;

      chai
        .request(app)
        .delete(`/products/${productId}`)
        .end((err, res) => {
          expect(res).to.have.status(204);

          Product.findOne({_id: productId})
          .then((deletedProduct) => {
            expect(deletedProduct).to.be.null;
          });
        })
    });

  });

  describe('DELETE /reviews/:review', () => {
    it('Should delete the review from the db based on id', async () => {
      let review = await getRandomReview();
      let reviewId = review._id;

      chai
        .request(app)
        .delete(`/reviews/${reviewId}`)
        .end((err, res) => {
          expect(res).to.have.status(204);

          Review.findOne({_id: reviewId})
          .then((deletedReview) => {
            expect(deletedReview).to.be.null;
          });
        })
    });

  });

});


const getRandomProduct = () => {
  return Product.find({})
    .then((products) => {
      let randomIndex = Math.floor(Math.random() * products.length);
      return products[randomIndex]
    });
}

const getRandomReview = () => {
  return Review.find({})
    .then((reviews) => {
      let randomIndex = Math.floor(Math.random() * reviews.length);
      return reviews[randomIndex]
    });
}



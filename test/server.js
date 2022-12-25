let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server.js");

// let should = chai.should();

chai.use(chaiHttp);

// describe("Products", () => {
//   beforeAll(() => {
//     // reset db
//   })

//   describe("initial state", () => {
//     it("should have no products", () => {

//     })
//   })

//   describe("after adding 3 products", () => {
//     let products;
//     beforeEach(() => {

//     })
//     it('should have 3 products in some order', async (done) => {
//       products = await fetch()
//       done()
//     })
//     describe('reviews', () => {
//       describe('initial state', () => {
//         it('should have no reviews', async (done) => {
//             const reviewsByProduct = await Promise.all(products.map(x => fetch(`/products/${x.id}/reviews`)))
            
//         })
//       })
//       describe('after adding reviews', () => {
//         it('should have those reviews', () => {

//         })
//         it('should be able to delete the reviews', () => {

//         })
//       })
//     })
//   })
// })

describe("Products", () => {
  describe("/GET products", () => {
    it("it should GET all the products", (done) => {
      chai
        .request(server)
        .get("/products")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.eql(9);
          done();
        });
    });
  });
  describe("/GET products/:productID", () => {
    it("it should GET the product by id", (done) => {
      chai
        .request(server)
        .get("/products/63a22284310e9986113a569a")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.deep.equal({

          })
          res.body.should.be.an("object");

          res.body.should.have.property("price");
          done(); 
        });
    });
  });
  describe("/GET products/:productID/reviews", () => {
    it("it should GET reviews for the product by ID", (done) => {
      chai
        .request(server)
        .get("/products/63a22284310e9986113a569a/reviews")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.eql(4);
          done();
        });
    });
  });
});

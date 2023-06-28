const app = require("../server.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("/GET products", () => {
  it("should GET all products", (done) => {
    chai
      .request(app)
      .get("/products")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("array");
        res.body.length.should.equal(9);
        done();
      });
  });
});

describe("/GET specific product by its ID", () => {
  it("should GET a specific product by its ID", (done) => {
    productID = "649335da433612eb55cab193";
    chai
      .request(app)
      .get(`/products/${productID}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.should.have.property("_id", productID);
        done();
      });
  });
});
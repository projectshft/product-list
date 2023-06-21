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
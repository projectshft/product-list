let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app/server");

let should = chai.should();

chai.use(chaiHttp);

describe("Products", () => {
  describe("/GET products", () => {
    it("it should GET 9 at a time of the total products", (done) => {
      chai
        .request(server)
        .get("/products")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.should.have.length(9);
          res.body[0].should.have.property("category");
          res.body[0].should.have.property("name");
          res.body[0].should.have.property("price");
          res.body[0].should.have.property("image");
          done();
        });
    });
    it("it should get products by category if query is used", (done) => {
      chai
        .request(server)
        .get("/products?category=Kids")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body[0].should.have.property("category").and.to.equal("Kids");
          res.body[0].should.have.property("name");
          res.body[0].should.have.property("price");
          res.body[0].should.have.property("image");
          done();
        });
    });
    it("it should sort products by price if query is used", (done) => {
      chai
        .request(server)
        .get("/products?price=highest")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body[0].should.have.property("category");
          res.body[0].should.have.property("name");
          res.body[0].should.have.property("price");
          res.body[0].should.have.property("image");
          //This seems to work correctly
          //Couldn't find clarification on how .above works in the chai docs
          res.body[0].price.should.be.above(res.body[1].price);
          done();
        });
    });
    it("it should get products containing string if query is used", (done) => {
      chai
        .request(server)
        .get("/products?query=Rubber")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body[0].should.have.property("category");
          res.body[0].should.have.property("name");
          res.body[0].should.have.property("price");
          res.body[0].should.have.property("image");
          done();
        });
    });
    it("it should get products containing string if query is used, and matching category if query is used", (done) => {
      chai
        .request(server)
        .get("/products?query=Rubber&category=Outdoors")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body[0].should.have.property("category");
          res.body[0].should.have.property("name");
          res.body[0].should.have.property("price");
          res.body[0].should.have.property("image");
          done();
        });
    });
    it("it should get products matching search parameters and sorted by price", (done) => {
      chai
        .request(server)
        .get("/products?query=Rubber&category=Outdoors&price=highest")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body[0].should.have.property("category");
          res.body[0].should.have.property("name");
          res.body[0].should.have.property("price");
          res.body[0].should.have.property("image");
          res.body[0].price.should.be.above(res.body[1].price);
          done();
        });
    });
  });
  describe("/POST products", () => {
    it("should create a new product in the database", (done) => {
      let product = {
        name: "toothbrush",
        price: 2,
        category: "household",
        image: "https://source.unsplash.com/random",
      };
      chai
        .request(server)
        .post("/products")
        .send(product)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("category");
          res.body.should.have.property("name");
          res.body.should.have.property("price");
          res.body.should.have.property("image");
          done();
        });
    });
  });
  describe("GET/ products/:product", () => {
    it("should return the specified product", (done) => {
      let id = "63253a95b3d4a79e6b2bf73f";

      chai
        .request(server)
        .get(`/products/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("category");
          res.body.should.have.property("name");
          res.body.should.have.property("price");
          res.body.should.have.property("image");
          done();
        });
    });
  });
  describe("DELETE/ products/:product", () => {
    it("should delete the specified product", (done) => {
      let id = "63253a96b3d4a79e6b2bfa4a";
      chai
        .request(server)
        .delete(`/products/${id}`)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
  describe("GET/ products/:product/reviews", () => {
    it("should return the specified product's reviews 4 at a time", (done) => {
      let id = "63253a95b3d4a79e6b2bf73f";
      chai
        .request(server)
        .get(`/products/${id}/reviews`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.an("object");
          res.body.should.have.length(4);
          res.body[0].should.have.property("username");
          res.body[0].should.have.property("text");
          res.body[0].should.have.property("product");
          done();
        });
    });
  });
  describe("POST/ products/:product/reviews", () => {
    it("should return the specified product's new review", (done) => {
      let id = "63253a95b3d4a79e6b2bf73f";
      let review = {
        username: "JoeShmoe",
        text: "I LOVE CHEESE!",
        product: "6324b9e7f237bbe88ab7252e",
      };
      chai
        .request(server)
        .post(`/products/${id}/reviews`)
        .send(review)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.an("object");
          res.body.should.have.property("username");
          res.body.should.have.property("text");
          res.body.should.have.property("product");
          done();
        });
    });
  });
  describe("DELETE/ products/:product/reviews/:review", () => {
    it("should delete the specified items specified review", (done) => {
      let id = "63253a95b3d4a79e6b2bf73f";
      let reviewId = "63253a95b3d4a79e6b2bf742";
      chai
        .request(server)
        .delete(`/products/${id}/reviews/${reviewId}`)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
});

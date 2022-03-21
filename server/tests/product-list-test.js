const Product = require('../models/product')
const Review = require('../models/review')

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../server");

let should = chai.should();

chai.use(chaiHttp);


describe("Product-List", () => {

  afterEach(() => {
    Product.deleteOne( { name: "test name" }, function (err, product) {
      if (err) throw err;
    })

    Review.deleteOne( {userName: "stephieB"}, function( err, product) {
      if (err) throw err;
      console.log(product);
    })
  });

  describe("/GET/products", () => {
    it("it should GET 9 of the products", (done) => {
      
      chai
        .request(server)
        .get("/products")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.eql(9);
          done();
        });
    });
  

    it("it should also GET 9 of the products", (done) => {
        
      chai
        .request(server)
        .get("/products?page=2")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.eql(9);
          done();
        });
    });
  });

  describe("/GET/products/:product", () => {
    it("it should GET a specific product", (done) => {
      let productId = '6234d7c25e8166fe79ee5729';
      chai
        .request(server)
        .get(`/products/${productId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });

    it("it should NOT GET a products with an invalid id", (done) => {
      let productId = "invalid";
      chai
        .request(server)
        .get(`/products/${productId}`)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    })

    it("it should NOT GET a product that does not exist", (done) => {
      let productId = "6234d7c25e8166fe79ee5725";
      chai
        .request(server)
        .get(`/products/${productId}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    })
  });

  describe("/GET/products/:product/reviews", () => {
    it("it should GET a specific products reviews", (done) => {
      let productId = '6234d7c25e8166fe79ee5729';
      chai
        .request(server)
        .get(`/products/${productId}/reviews`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.below(5);
          done();
        });
    });

    it("it should GET the second page of specific products reviews", (done) => {
      let productId = '6234d7c25e8166fe79ee5729';
      chai
        .request(server)
        .get(`/products/${productId}/reviews?page=2`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.below(5);
          done();
        });
    });

    it("it should NOT GET reviews if product id is invalid", (done) => {
      let productId = "invalid";
      chai
        .request(server)
        .get(`/products/${productId}/reviews?page=3`)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    })

    it("it should NOT GET reviews if product does not exist", (done) => {
      let productId = "000000000000000000000000";
      chai
        .request(server)
        .get(`/products/${productId}/reviews?page=3`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    })
  });

  describe("/POST/products", () => {
    it("it should POST an item to products collection", (done) => {

      let product = new Product();
      product.category = "test cat";
      product.name = "test name";
      product.price = 100
      product.image = "http://www.test.come";

      chai
        .request(server)
        .post("/products")
        .send(product)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('category');
          res.body.should.have.property('name');
          res.body.should.have.property('price');
          res.body.should.have.property('image');
          res.body.should.have.property('reviews');
          done();
        });
    });

    
    it("it should not POST add a product if no name", (done) => {
      let product = new Product();

      chai
        .request(server)
        .post("/products")
        .send(product)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // add some other bad data?
  });

  describe("/POST/products/:product/reviews", () => {
    it("it should POST an item to products review", (done) => {
      
      // create post and save
      let product = new Product();
      product.category = "test cat";
      product.name = "test name";
      product.price = 100
      product.image = "http://www.test.come";

      let productId = product._id;
      
      product.save((err) => {
        if (err) throw err;
      });

      // create review and push
      let review = new Review();
      review.userName = "stephieB"
      review.text = "fakie review text"
      review.product = product._id;

      chai
        .request(server)
        .post(`/products/${productId}/reviews`)
        .send(review)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('product');
          res.body.should.have.property('userName');
          res.body.should.have.property('text');
          done();
        });
    });

    it("it should not POST a review if no username or text", (done) => {
      // create post and save
      let product = new Product();
      product.category = "test cat";
      product.name = "test name";
      product.price = 100
      product.image = "http://www.test.come";

      let productId = product._id;
      
      product.save((err) => {
        if (err) throw err;
      });

      // create review and push
      let review = new Review();
      review.text = "fakie review text"
      review.product = product._id;

      chai
        .request(server)
        .post(`/products/${productId}/reviews`)
        .send(review)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("it should not POST a review if invalid product id", (done) => {

      // create review and push
      let review = new Review();
      review.text = "fakie review text"

      chai
        .request(server)
        .post(`/products/invalidProductId/reviews`)
        .send(review)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("it should not POST a review if product does not exist", (done) => {

      // create review and push
      let review = new Review();
      review.text = "fakie review text"
      review.userName = "stephB"
      review.product = '6234d7c25e8166fe79ee5725';

      chai
        .request(server)
        .post(`/products/6234d7c25e8166fe79ee5725/reviews`)
        .send(review)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("/DELETE/products/:product", () => {
    it("it should DELETE a product from the database", (done) => {
      let product = new Product();
      product.category = "test cat";
      product.name = "test name";
      product.price = 100
      product.image = "http://www.test.come";

      product.save((err) => {
        if (err) throw err;
      });

      chai
        .request(server)
        .delete(`/products/${product._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("it should not DELETE if invalid product id", (done) => {

      chai
        .request(server)
        .delete(`/products/invalidProductId`)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    })

    it("it should not DELETE if nonexisting product id", (done) => {

      chai
        .request(server)
        .delete(`/products/6234d7c25e8166fe79ee5726`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    })

  });

  describe("DELETE/reviews/:review", () => {

    it("it should DELETE a review from the database", (done) => {
      
      let review = new Review();
      review.text = "test review hehe";
      review.userName = "stephieB";
      review.save((err) => {
        if (err) throw err;
      });
    
      chai
        .request(server)
        .delete(`/reviews/${review._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("it should not DELETE a review if invalid ID", (done) => {
      
      chai
        .request(server)
        .delete(`/reviews/review._id`)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("it should not DELETE a review if review doesn't exist", (done) => {
      
      chai
        .request(server)
        .delete(`/reviews/6234d7c25e8166fe79ee5727`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  }); 
});
let chai = require("chai")
let chaiHttp = require("chai-http")
let server = require('../server')

chai.use(chaiHttp)
// let should = chai.should()

describe("Products", () =>{
  describe("/GET products", () => {

    it("it should GET all the products, no more than 9 at a time", (done) =>{ 
      chai
      .request(server)
      .get('/products')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.an("array")
        res.body.length.should.be.eql(9)
        done()
      })
    })
  })
  describe("/POST products", () => {
    it("it should POST a new product", (done)=>{
      chai
      .request(server)
      .post("/products")
      .set('Accept', 'application/json')
      .send({
        category:"Computers", 
        name:"Test Computer Product", 
        price: 17000, 
        image: "https://via.placeholder.com/250?text=Product+Image", 
        reviews: []
      })
      .end((err, res)=>{
        res.should.have.status(200)
        done()
      })
    })
  })
})
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Image} from "react-bootstrap";

const Products = () => {

  let example = [
    {
      price: 472,
      name: "Sleek Fresh Soap",
      category: "Tools"
    },
    {
      price: 4452,
      name: "Sleek Fresh Soap",
      category: "Tools"
    },
    {
      price: 42,
      name: "Sleek Fresh Soaghjghjhgjghjp",
      category: "Tools"
    },
    {
      price: 44452,
      name: "Sleek Fresh Soap",
      category: "Tools"
    },
    {
      price: 452,
      name: "Sleek sfds Soap",
      category: "Tools"
    },
    {
      price: 445,
      name: "Ssdfs",
      category: "Tools"
    },
    {
      price: 472,
      name: "Slsdfssh Soap",
      category: "Tools"
    },
    {
      price: 472,
      name: "Sleek Fresh Soap",
      category: "Tools"
    }
  ]

  const Product = () => {
    const rows = [];

    for (let i=0; i < example.length; i++) {
      rows.push(
        <Col className="mb-5" xs={4}>
            <Row>
              <Col xs={{span: 8, offset: 2}} style={{backgroundColor: 'white'}}>
                <Row>
                  <Col className="mt-3" xs={8} style={{backgroundColor: '#7ECECB'}}>
                    <div>
                      <span>Category:</span>
                      <span className="fw-bold"> {example[i].category}</span>
                    </div>
                  </Col>
                  <Col xs={4} style={{backgroundColor: '#ECCE66'}}>
                    <h2 className="text-end">{example[i].price}</h2>
                  </Col>
                </Row>
                <img src="https://www.papo-france.com/669/t-rex.jpg" className="mb-2" height={'300rem'} width={'100%'} alt='...'/>
                <Row>
                  <Col>
                    <div>
                      <h1>{example[i].name}</h1>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
      )
    }
    
    return rows;
  }

  return (
    <Row className="mt-5">
      <Col>
        <Row className="mb-5">
          <Product />
        </Row>
      </Col>
    </Row>
  )
}

export default Products;
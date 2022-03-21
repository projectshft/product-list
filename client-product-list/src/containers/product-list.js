import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import { useSelector } from "react-redux";



const ProductList = () => {

  const products = useSelector(state => state.products);

  const renderProductList = () => {
    return (
      <Row xs={1} md={3} className="g-4">
        {products.map((p, idx) => (
          <Col key={idx}>
            <Card style={{ width: '18rem' }}>
              <Card.Header>
                <Card.Text>Category: {p.category}</Card.Text>
              </Card.Header>
              <Card.Img variant="top" src={p.image} />
              <Card.Body>
                <Card.Title>{p.name}</Card.Title>
                <Card.Title>{p.price}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    )
  }

  return (
    <div>{renderProductList()}</div>
  )
};

export default ProductList;
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const productList = () => {
  return (
    <>
      <Row xs={1} md={3} className="g-4">
        {Array.from({ length: 9 }).map((_, idx) => (
          <Col>
            <Card>
              <Card.Header>
                <Card.Text>Category: Toys</Card.Text>
              </Card.Header>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Product Name</Card.Title>
                <Card.Title>$</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
};

export default productList;
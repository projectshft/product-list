import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Container } from 'react-bootstrap/';
import PaginationContainer from './Pagination';

export default function DisplayProducts() {
  const state=useSelector((state) => state);
  console.log(state)
  const products = useSelector((state) => state.search.products);
  if (products.length<1) {
    return <Container>No product was found. Try another search parameters.</Container>;
  }

  const productsMap = products.map((product) => (
    <Col xs={4} key={product._id} >
      <Container style={{ height: '400px', margin: '15%'}}>
        <Card style={{width:'19rem'}} >
          <Card.Header
            style={{
              backgroundColor: 'white',
              borderColor: 'white',
              float: 'right',
              fontSize: '25px',
            }}
          >
            {product.price} $
          </Card.Header>
          <Card.Header
            style={{
              backgroundColor: 'white',
              borderColor: 'white',
              float: 'left',
              display: 'table',
            }}
          >
            Category: <strong>{product.category}</strong>
          </Card.Header>
          <Card.Img
            style={{ padding: '20px', paddingTop: '10px' }}
            src={product.image}
          />
          <Card.Body style={{ backgroundColor: '#1A7C91' }}>
            <Card.Title style={{ color: 'white', textAlign: 'center' }}>
              {product.name}
            </Card.Title>
          </Card.Body>
        </Card>
      </Container>
    </Col>
  ));
  return (
    <Container>
        <Row style={{ 
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          width: "100%"
          }} >{productsMap}</Row>
      <PaginationContainer />
    </Container>
  );
}

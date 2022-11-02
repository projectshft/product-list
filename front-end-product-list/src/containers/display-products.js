import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Container } from 'react-bootstrap/';
import PaginationContainer from './Pagination';

export default function DisplayProducts() {
  const products = useSelector((state) => state.search.products);
  if (products.length > 0) {
      const productsMap1 = products.slice(0, 3).map((product) => (
        <Col xs={4} key={product._id}>
          <Container style={{ height: '400px', margin: '20px' }}>
            <Card style={{ width: '19rem' }}>
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
              <Card.Body style={{ backgroundColor: '#008cba' }}>
                <Card.Title style={{ color: 'white', textAlign: 'center' }}>
                  {product.name}
                </Card.Title>
              </Card.Body>
            </Card>
          </Container>
        </Col>
      ));
      const productsMap2 = products.slice(3, 6).map((product) => (
        <Col xs={4} key={product._id}>
          <Container style={{ height: '400px', margin: '20px' }}>
            <Card style={{ width: '19rem' }}>
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
              <Card.Body style={{ backgroundColor: '#008cba' }}>
                <Card.Title style={{ color: 'white', textAlign: 'center' }}>
                  {product.name}
                </Card.Title>
              </Card.Body>
            </Card>
          </Container>
        </Col>
      ));
      const productsMap3 = products.slice(6, 9).map((product) => (
        <Col xs={4} key={product._id}>
          <Container style={{ height: '400px', margin: '20px' }}>
            <Card style={{ width: '19rem' }}>
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
              <Card.Body style={{ backgroundColor: '#008cba' }}>
                <Card.Title style={{ color: 'white', textAlign: 'center' }}>
                  {product.name}
                </Card.Title>
              </Card.Body>
            </Card>
          </Container>
        </Col>
      ));

      return (
        <Row>
          <Container style={{ display: 'table-cell' }}>
            <Row>{productsMap1}</Row>
            <Row>{productsMap2}</Row>
            <Row>{productsMap3}</Row>
          </Container>
          <PaginationContainer />
        </Row>
      );
    }

    return <Row>No product was found. Try another search parameters.</Row>;
  }

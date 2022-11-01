import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { Row, Col, Card, Pagination } from 'react-bootstrap/';

export default function DisplayProducts() {
  const products = useSelector((state) => state.search.products);
  const docs = useSelector((state) => state.search.count);
  console.log(products)
  console.log(docs)
  const pages=Math.floor(docs/9)
  const active = 1;
  const items = [];
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

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
          <Container style={{ display: 'table-cell' }}>
            <Row>{productsMap1}</Row>
            <Row>{productsMap2}</Row>
            <Row>{productsMap3}</Row>
          <Pagination style={{marginLeft:'40%'}}>{items}</Pagination>
          </Container>
      );
    }

    return <Row>No product was found. Try another search parameters.</Row>;
  }

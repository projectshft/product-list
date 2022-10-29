import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


export default function DisplayProducts() {
  const products = useSelector((state) => state.search);

  const productsMap1 = products.slice(0, 3).map((product) => (
    <Col xs={4} key={product._id}>
      <Container style={{ height: '400px', margin: '20px' }}>
        <Card style={{ width: '19rem' }}>
          <Card.Header
            style={{
              'background-color': 'white',
              'border-color': 'white',
              float: 'right',
              'font-size': '25px',
            }}
          >
            {product.price} $
          </Card.Header>
          <Card.Header
            style={{
              'background-color': 'white',
              'border-color': 'white',
              float: 'left',
              display: 'table',
            }}
          >
            Category: <strong>{product.category}</strong>
          </Card.Header>
          <Card.Img
            style={{ padding: '20px', 'padding-top': '10px' }}
            src={product.image}
          />
          <Card.Body style={{ 'background-color': '#008cba' }}>
            <Card.Title style={{ color: 'white', 'text-align': 'center' }}>
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
              'background-color': 'white',
              'border-color': 'white',
              float: 'right',
              'font-size': '25px',
            }}
          >
            {product.price} $
          </Card.Header>
          <Card.Header
            style={{
              'background-color': 'white',
              'border-color': 'white',
              float: 'left',
              display: 'table',
            }}
          >
            Category: <strong>{product.category}</strong>
          </Card.Header>
          <Card.Img
            style={{ padding: '20px', 'padding-top': '10px' }}
            src={product.image}
          />
          <Card.Body style={{ 'background-color': '#008cba' }}>
            <Card.Title style={{ color: 'white', 'text-align': 'center' }}>
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
              'background-color': 'white',
              'border-color': 'white',
              float: 'right',
              'font-size': '25px',
            }}
          >
            {product.price} $
          </Card.Header>
          <Card.Header
            style={{
              'background-color': 'white',
              'border-color': 'white',
              float: 'left',
              display: 'table',
            }}
          >
            Category: <strong>{product.category}</strong>
          </Card.Header>
          <Card.Img
            style={{ padding: '20px', 'padding-top': '10px' }}
            src={product.image}
          />
          <Card.Body style={{ 'background-color': '#008cba' }}>
            <Card.Title style={{ color: 'white', 'text-align': 'center' }}>
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
    </Container>
  );
}

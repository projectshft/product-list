import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import {Row, Col, Card} from 'react-bootstrap/';



export default function DisplayProducts() {
  const products = useSelector((state) => state.search)
  console.log(products)

  const productsMap1 = products.slice(0, 3).map((product) => (
    <Col xs={4} key={product._id}>
      <Container style={{ height: '400px', margin: '20px' }}>
        <Card style={{ width: '19rem' }}>
          <Card.Header
            style={{
              'backgroundColor': 'white',
              'borderColor': 'white',
              float: 'right',
              'fontSize': '25px',
            }}
          >
            {product.price} $
          </Card.Header>
          <Card.Header
            style={{
              'backgroundColor': 'white',
              'borderColor': 'white',
              float: 'left',
              display: 'table',
            }}
          >
            Category: <strong>{product.category}</strong>
          </Card.Header>
          <Card.Img
            style={{ padding: '20px', 'paddingTop': '10px' }}
            src={product.image}
          />
          <Card.Body style={{ 'backgroundColor': '#008cba' }}>
            <Card.Title style={{ color: 'white', 'textAlign': 'center' }}>
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
              'backgroundColor': 'white',
              'borderColor': 'white',
              float: 'right',
              'fontSize': '25px',
            }}
          >
            {product.price} $
          </Card.Header>
          <Card.Header
            style={{
              'backgroundColor': 'white',
              'borderColor': 'white',
              float: 'left',
              display: 'table',
            }}
          >
            Category: <strong>{product.category}</strong>
          </Card.Header>
          <Card.Img
            style={{ padding: '20px', 'paddingTop': '10px' }}
            src={product.image}
          />
          <Card.Body style={{ 'backgroundColor': '#008cba' }}>
            <Card.Title style={{ color: 'white', 'textClign': 'center' }}>
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
              'backgroundColor': 'white',
              'borderColor': 'white',
              float: 'right',
              'fontSize': '25px',
            }}
          >
            {product.price} $
          </Card.Header>
          <Card.Header
            style={{
              'backgroundColor': 'white',
              'borderColor': 'white',
              float: 'left',
              display: 'table',
            }}
          >
            Category: <strong>{product.category}</strong>
          </Card.Header>
          <Card.Img
            style={{ padding: '20px', 'paddingTop': '10px' }}
            src={product.image}
          />
          <Card.Body style={{ 'backgroundColor': '#008cba' }}>
            <Card.Title style={{ color: 'white', 'textAlign': 'center' }}>
              {product.name}
            </Card.Title>
          </Card.Body>
        </Card>
      </Container>
    </Col>
  ));

  return (
    <Container style={{ display: 'table-cell'}}>
      <Row>{productsMap1}</Row>
      <Row>{productsMap2}</Row>
      <Row>{productsMap3}</Row>
    </Container>
  );
}

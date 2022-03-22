import { useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Product = ({data}) => {
  return (
    <div>
      <h5>{data}</h5>
    </div>
  )
};

const Products = () => {
  // const products = useSelector((state) => {
  //   return state.products;
  // });

  useEffect(() => {

  }, []);

  const products = ['William Shakespeare', 'William Shakespeare', 'William Shakespeare', 'William Shakespeare', 'William Shakespeare', 'William Shakespeare', 'William Shakespeare', 'William Shakespeare', 'William Shakespeare']

  return (
    <Container>
      <Row>
        <Col>
          <Product data={products[0]}/>
        </Col>
        <Col>
          <Product data={products[1]}/>  
        </Col>
        <Col>
          <Product data={products[2]}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Product data={products[3]}/>
        </Col>
        <Col>
          <Product data={products[4]}/>
        </Col>
        <Col>
          <Product data={products[5]}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Product data={products[6]}/>
        </Col>
        <Col>
          <Product data={products[7]}/>
        </Col>
        <Col>
          <Product data={products[8]}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Products;
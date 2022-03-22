import { useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchSetting, getProducts } from '../actions';

const Product = ({data}) => {
  if (data) {
    return (
      <div className="product-container">
        <p className="product-header">Category: {data.category}<span className="product-price">${data.price}</span></p>
        <img className="product-image" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Rube_Goldberg%27s_%22Self-Operating_Napkin%22_%28cropped%29.gif" alt="some text"></img>
        <h3 className="product-name">{data.name}</h3>
      </div>
    )
  }

  return <div></div>;
};

const Products = () => {
  const products = useSelector((state) => state.main.products || []);
  const pageNum = useSelector(state => state.main.page);
  const searchSettings = useSelector((state) => state.searchSettings);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(searchSettings));
  }, [searchSettings]);


  return (
    <Container>
      <Row>
        <Col className="page-header">
          <h5>Page {pageNum}</h5>
        </Col>
      </Row>
      <Row>
        <Col className="test" md={4}>
          <Product data={products[0]}/>
        </Col>
        <Col md={4}>
          <Product data={products[1]}/>  
        </Col>
        <Col md={4}>
          <Product data={products[2]}/>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Product data={products[3]}/>
        </Col>
        <Col md={4}>
          <Product data={products[4]}/>
        </Col>
        <Col md={4}>
          <Product data={products[5]}/>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Product data={products[6]}/>
        </Col>
        <Col md={4}>
          <Product data={products[7]}/>
        </Col>
        <Col md={4}>
          <Product data={products[8]}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Products;
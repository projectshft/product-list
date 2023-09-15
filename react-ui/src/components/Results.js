import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import Product from './Product';

const Results = () => {
  const products = useSelector((state) => state.results.results);

  const content = products.map((product) => (
    <Col className="d-flex justify-content-center" key={product._id}>
      <Product product={product} />
    </Col>
  ));

  return (
    <Container>
      <Row className="justify-items-center">{content}</Row>
    </Container>
  );
};

export default Results;

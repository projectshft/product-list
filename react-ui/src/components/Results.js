import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import Product from './Product';

const Results = () => {
  const status = useSelector((state) => state.results.status);
  const error = useSelector((state) => state.results.error);
  const products = useSelector((state) => state.results.results);

  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    content = products.map((product) => (
      <Col className="d-flex justify-content-center" key={product._id}>
        <Product product={product} />
      </Col>
    ));
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <Container>
      <Row className="justify-items-center">{content}</Row>
    </Container>
  );
};

export default Results;

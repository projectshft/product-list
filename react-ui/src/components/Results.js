import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from './Product';

const Results = ({ products }) => {
  const content = products.map((product) => (
    <Col className="d-flex justify-content-center" key={product._id.$oid}>
      <Product product={product} />
    </Col>
  ));

  return (
    <Container>
      <Row className="justify-items-center">{content}</Row>
    </Container>
  );
};

Results.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      image: PropTypes.string,
      reviews: PropTypes.array
    })
  )
};

export default Results;

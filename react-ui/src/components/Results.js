import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Product from './Product';

const Results = ({ products }) => (
  <Container>
    <Row>
      {products.map((product) => (
        <Product key={product._id.$oid} product={product} />
      ))}
      ;
    </Row>
  </Container>
);

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

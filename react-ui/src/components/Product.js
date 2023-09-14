import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

const Product = ({ product }) => (
  <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={product.image} />
    <Card.Body>
      <Card.Title>{product.name}</Card.Title>
    </Card.Body>
    <Card.Body>
      <Card.Text>
        <p>Category: {product.category}</p>
        <p>${product.price}</p>
      </Card.Text>
    </Card.Body>
  </Card>
);

Product.propTypes = {
  product: PropTypes.shape({
    category: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number
  })
};

export default Product;

import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

const Product = ({ product }) => (
  <Card style={{ width: '20rem' }} className="mb-5">
    <Card.Img variant="top" src={product.image} />
    <Card.Body>
      <Card.Title>{product.name}</Card.Title>
      <Card.Text>Category: {product.category}</Card.Text>
      <Card.Text>${product.price}</Card.Text>
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

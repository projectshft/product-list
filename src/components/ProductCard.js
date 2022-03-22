import { PropTypes } from 'prop-types';
import { Col, Card } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  const { name, category, price, image } = product;

  return (
    <Col
      xs={12}
      sm={6}
      md={6}
      lg={4}
      xl={4}
      className="d-flex align-items-stretch"
    >
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title className="mb-3" style={{ fontSize: '1.1rem' }}>
            <strong>{name}</strong>
          </Card.Title>
          <Card.Text>Category: {category}</Card.Text>
          <Card.Text>Price: ${price}</Card.Text>
        </Card.Body>
        <Card.Img variant="bottom" src={image} className="product-img" />
      </Card>
    </Col>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;

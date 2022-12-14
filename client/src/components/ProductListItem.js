import { Col, Row } from 'react-bootstrap';

const ProductListItem = ({ product }) => {
  console.log("Product in List Item: ", product)
  return (
    <Col className="p-4" md={4}>
      <Row>
        <Col md={6}>
          <div><strong>Category: </strong>{product.category}</div>
        </Col>
        <Col md={6}>
          <div>{product.price}$</div>
        </Col>
      </Row>
      <Row>
        <img src={product.image} alt='' />
      </Row>
      <Row>
        {product.name}
      </Row>
    </Col>
  );
}

export default ProductListItem;

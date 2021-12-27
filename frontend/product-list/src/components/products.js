import { Row, Col } from 'react-bootstrap';
import ProductsIndex from "./products-index"
import CategoriesList from './categories-list';

const Products = () => {
  return (
    <Row>
      <Col lg={2}>
        <CategoriesList />
      </Col>
      <Col lg={8}>
        <ProductsIndex />
      </Col>
    </Row>
  );
}

export default Products;
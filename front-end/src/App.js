import { Container, Row, Col } from 'react-bootstrap';

import ProductGrid from './components/ProductGrid';
import SearchBar from './components/SearchBar';

const App = () => (
  <Container fluid>
    <Col md={{ span: 10, offset: 1 }}>
      <h1 className="display-3 text-center m-4">Product List</h1>
      <hr />
      <SearchBar />
    </Col>
    <ProductGrid />
  </Container>
);

export default App;

import { Container, Row, Col } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

import SearchBar from './components/SearchBar';
import Products from './components/Products';

const App = () => (
  <Container fluid>
    <Row>
      <Col md={{ span: 10, offset: 1 }}>
        <h1 className="display-3 text-center m-4">Express Products</h1>
        <hr />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Products />} />
        </Routes>
      </Col>
    </Row>
  </Container>
);

export default App;

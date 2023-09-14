import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SearchBar = () => (
  <Container className="p-5">
    <Row>
      <Col>
        <Form className="d-flex">
          <Form.Group className="flex-grow-1 me-2" controlId="searchInput">
            <Form.Control type="text" placeholder="Search" />
          </Form.Group>
          <Button variant="primary" type="submit" className="me-4">
            Submit
          </Button>
          <Form.Group className="me-4" controlId="category">
            <Form.Select aria-label="Category">
              <option>Filter by category</option>
              <option value="clothing">Clothing</option>
              <option value="electronics">Electronics</option>
              <option value="home">Home</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="me-4" controlId="sortByPrice">
            <Form.Select aria-label="Sort by price">
              <option>Sort by price</option>
              <option value="lowest">Low to High</option>
              <option value="highest">High to Low</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  </Container>
);

export default SearchBar;

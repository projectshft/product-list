import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

const SearchBar = () => (
  <Container>
    <Row>
      <Form>
        <Form.Group className="mb-3" controlId="searchInput">
          <Form.Control type="text" placeholder="Search" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Select aria-label="Category">
            <option>Category</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="home">Home</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="sortByPrice">
          <Form.Select aria-label="Sort by price">
            <option>Sort by price</option>
            <option value="lowest">Low to High</option>
            <option value="highest">High to Low</option>
          </Form.Select>
        </Form.Group>
      </Form>
    </Row>
  </Container>
);

export default SearchBar;

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { setSearchParameters } from '../slices/searchSlice';

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      setSearchParameters({
        query: event.target.elements.searchInput.value,
        category:
          event.target.elements.filterByCategory.value !== 'Filter by category'
            ? event.target.elements.filterByCategory.value
            : null,
        price:
          event.target.elements.sortByPrice.value !== 'Sort by price'
            ? event.target.elements.sortByPrice.value
            : null
      })
    );
    event.target.elements.searchInput.value = '';
  };

  return (
    <Container className="p-5">
      <Row>
        <Col>
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Group className="flex-grow-1 me-4" controlId="searchInput">
              <Form.Control type="text" placeholder="Search" />
            </Form.Group>
            <Form.Group className="me-4" controlId="filterByCategory">
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;

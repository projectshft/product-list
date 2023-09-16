/**
 * @component
 * Component for rendering search bar
 */

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchParameters, changeDropdown } from '../slices/searchSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  // Get existing product categories when component loads
  useEffect(() => {
    const getCategories = async () => {
      const url = 'http://localhost:8000/categories';
      const response = await axios.get(url);
      setCategories(response.data);
    };

    getCategories();
  }, []);

  // Update state when search form is submitted
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
  };

  // Also update state whenever a dropdown option is changed
  const handleChange = (event) => {
    dispatch(
      changeDropdown({ type: event.target.id, value: event.target.value })
    );
  };

  return (
    <Container className="p-5">
      <Row>
        <Col>
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Group className="flex-grow-1 me-2" controlId="searchInput">
              <Form.Control type="text" placeholder="Search" />
            </Form.Group>
            <Button variant="primary" type="submit" className="me-4">
              Submit
            </Button>
            <Form.Group className="me-4" controlId="filterByCategory">
              <Form.Select aria-label="Category" onChange={handleChange}>
                <option>Filter by category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="me-4" controlId="sortByPrice">
              <Form.Select aria-label="Sort by price" onChange={handleChange}>
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
};

export default SearchBar;

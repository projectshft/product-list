import { useState } from 'react';
import { Col, InputGroup, Form, Button, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { fetchProducts } from '../actions';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(fetchProducts(searchQuery));

    setSearchQuery('');
  };

  return (
    <Col md={{ span: 6, offset: 3 }}>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="pt-2 mb-3">
          <FormControl
            placeholder="Search Products"
            value={searchQuery}
            aria-label="Product Search"
            aria-describedby="products-search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline-secondary" type="submit" id="button-addon2">
            Search
          </Button>
        </InputGroup>
      </Form>
    </Col>
  );
};

export default SearchBar;

import { useState } from 'react';
import {
  Col,
  InputGroup,
  Form,
  Button,
  FormControl,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { fetchProducts, fetchbyQuery } from '../actions';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const dispatch = useDispatch();

  const handleSelect = (query, cat, sort) => {
    setSearchQuery(query);
    setCategory(cat);
    setPrice(sort);

    dispatch(fetchbyQuery(query, cat, sort));
  };

  return (
    <Col md={{ span: 8, offset: 2 }}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSelect(searchQuery, category, price);
        }}
      >
        <InputGroup className="search mb-3 mr-3">
          <FormControl
            aria-label="Text input with dropdown button"
            placeholder="Seach By Product Name or Category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <DropdownButton
            variant="outline-secondary"
            title="Sort By Category"
            type="submit"
            id="button-dropdown"
            alignRight
            value={category}
            onSelect={(cat) => {
              handleSelect(searchQuery, cat, price);
            }}
          >
            <Dropdown.Item eventKey="Grocery">Grocery</Dropdown.Item>
            <Dropdown.Item eventKey="Tools">Tools</Dropdown.Item>
            <Dropdown.Item eventKey="Outdoors">Outdoors</Dropdown.Item>
            <Dropdown.Item eventKey="Toys">Toys</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            variant="outline-secondary"
            title="Sort By Price"
            type="submit"
            id="button-dropdown-2"
            alignRight
            value={price}
            onSelect={(sort) => {
              handleSelect(searchQuery, category, sort);
            }}
          >
            <Dropdown.Item eventKey="desc">Highest</Dropdown.Item>
            <Dropdown.Item eventKey="asc">Lowest</Dropdown.Item>
          </DropdownButton>
        </InputGroup>
      </Form>
    </Col>
  );
};

export default SearchBar;

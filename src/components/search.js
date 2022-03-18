import { useState } from 'react';
import {
  Dropdown,
  Form,
  DropdownButton,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../actions';

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleQuerySearch = (e) => {
    e.preventDefault();
    dispatch(fetchProducts(query));
  };

  function renderUserInput() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <Form onSubmit={handleQuerySearch}>
              <Form.Group className="mb-3 mt-3" controlId="formSearch">
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Search"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
          <DropdownButton
            className="mt-3 col-md-2"
            id="dropdown-basic-button"
            title="Category"
          >
            <Dropdown.Item href="#/action-1">Beauty</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Music</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Sports</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Tools</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            className="mt-3 col-md-2"
            id="dropdown-basic-button"
            title="Price"
          >
            <Dropdown.Item href="#/action-1">Highest</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Lowest</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    );
  }

  return <div>{renderUserInput()}</div>;
};

export default Search;

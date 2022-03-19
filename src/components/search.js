import { useState } from 'react';
import {
  Dropdown,
  FormControl,
  DropdownButton,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../actions';

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleQuerySearch = (e) => {
    e.preventDefault();
    dispatch(fetchProducts('query', query));
  };

  function renderUserInput() {
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-8">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search"
                type="text"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
              />
              <Button onClick={handleQuerySearch} variant="primary">
                Search
              </Button>
            </InputGroup>
          </div>
          <div className="col-md-2">
            <DropdownButton
              id="dropdown-basic-button"
              onSelect={(eventKey) =>
                dispatch(fetchProducts('category', eventKey))
              }
              title="Category"
            >
              <Dropdown.Item eventKey="Beauty">Beauty</Dropdown.Item>
              <Dropdown.Item eventKey="Electronics">Electronics</Dropdown.Item>
              <Dropdown.Item eventKey="Sports">Sports</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="col-md-2">
            <DropdownButton
              id="dropdown-basic-button"
              onSelect={(eventKey) =>
                dispatch(fetchProducts('price', eventKey))
              }
              title="Price"
            >
              <Dropdown.Item eventKey="highest">highest</Dropdown.Item>
              <Dropdown.Item eventKey="lowest">lowest</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    );
  }

  return <div>{renderUserInput()}</div>;
};

export default Search;

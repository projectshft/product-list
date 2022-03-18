import React from 'react';
import {
  Dropdown,
  Form,
  DropdownButton,
  InputGroup,
  Button,
} from 'react-bootstrap';

const Search = () => {
  function renderUserInput() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <Form>
              <Form.Group className="mb-3 mt-3" controlId="formSearch">
                <InputGroup className="mb-3">
                  <Form.Control placeholder="Search" />
                  <Button variant="primary" id="button-addon2">
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

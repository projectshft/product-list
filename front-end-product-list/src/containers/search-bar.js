import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap/';
import { fetchQuery, fetchCategories } from '../actions/index';

const SearchBar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  useEffect(() => {
    console.log('Useeffect');
    dispatch(fetchCategories());
  }, []);

  const [state, setState] = useState({ search: '', category: '', price: '' });

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(fetchQuery(state));
  };

  const categoriesMap = categories.map((cat, i) => (
    <option role="button" key={i + 1} value={cat}>
      {cat}
    </option>
  ));

  return (
    <InputGroup style={{ zIndex: '999' }} className="mb-3">
      <Form.Control
        style={{ width: '37%' }}
        aria-label="Search Field"
        aria-describedby="basic-addon1"
        onChange={(e) => {
          setState({ price: '', category: '', search: e.target.value });
        }}
      />
      <Button
        variant="outline-secondary"
        id="button-addon1"
        onClick={handleClick}
      >
        Search
      </Button>

      <Form.Select
        style={{ marginLeft: '20px', marginRight: '20px', width: '20px' }}
        onChange={(e) => setState({ ...state, category: e.target.value })}
      >
        <option value="">Sort by category</option>
        {categoriesMap}
      </Form.Select>

      <Form.Select
        aria-label="Sort by price"
        onChange={(e) => {
          setState({ ...state, price: e.target.value });
        }}
      >
        <option>Sort by price</option>
        <option value="highest">Price from high to low</option>
        <option value="lowest">Price from low to high</option>
      </Form.Select>
    </InputGroup>
  );
};

export default SearchBar;

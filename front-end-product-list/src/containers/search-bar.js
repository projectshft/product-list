import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../actions';
import Dropdown from 'react-bootstrap/Dropdown';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handleChange = (e) => setInput(e.target.value);
  const handleClick = (e) => {
    e.preventDefault()
    dispatch(fetchData(input));
  };

  const handleClickCategory = () => {
    dispatch();
  };

  const handleClickSorting = () => {
    dispatch();
  };
  return (
    <div className="input-group mb-4">
      <input
        type="text"
        className="form-control"
        aria-describedby="button-addon2"
        aria-label="searchBar"
        placeholder="input for a product you'd like to find"
        value={input}
        onChange={handleChange}
      />
      <button
        onClick={handleClick}
        type="button"
        className="btn btn-outline-secondary"
        id="button-addon2"
      >
        Search
      </button>
      <button
        onClick={handleClickCategory}
        type="button"
        className="btn btn-outline-secondary"
        id="button-addon"
      >
        Category
      </button>

      <Dropdown>
      <Dropdown.Toggle variant="danger" id="dropdown-basic">
        Sort price
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Price low to high</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Price high to low</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>



      {/* <button
        onClick={handleClickSorting}
        type="button"
        className="btn btn-outline-secondary"
        id="button-addon"
      >
        Sort
      </button> */}
    </div>
  );
};

export default SearchBar;
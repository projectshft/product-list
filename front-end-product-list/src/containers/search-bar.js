import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { fetchQuery, fetchCategories} from '../actions';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');
  const categories = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  });
  const categoriesMap = categories.map((cat,i) => (
    <Dropdown.Item role='menuitem' key={i+5444} value={cat} onClick={()=>setCategory(cat)}>
      {cat}
    </Dropdown.Item>
  ));
  

  const handleChange = (e) => setInput(e.target.value);
  const handleClick = (e) => {
    e.preventDefault()
    dispatch(fetchQuery(input,category,sort));
  };

  // const handleClickCategory = () => {
  //   dispatch(fetchCategory(category));
  // };
  // const handleClickSorting = (sort) => {
  //   dispatch(fetchSort(sort));
  // };

  return (
    <div className="input-group mb-5">
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

      <DropdownButton
        id="dropdown-button-dark-example2"
        variant="secondary"
        menuVariant="dark"
        title="Sort by category"
        style={{ paddingLeft: '20px', paddingRight: '20px' }}
      >
        {categoriesMap}
      </DropdownButton>

      <DropdownButton
        id="dropdown-button-dark"
        variant="secondary"
        menuVariant="dark"
        title="Sort by price"
      >
        <Dropdown.Item role='menuitem' onClick={()=>setSort('lowest')} >
          Price low to high
        </Dropdown.Item>
        <Dropdown.Item role='menuitem' onClick={()=>setSort('highest')}>
          Price high to low
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default SearchBar;

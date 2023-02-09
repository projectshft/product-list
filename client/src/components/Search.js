import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { searchProduct } from '../redux/actions'
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  // Submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchProduct(input));
    setQuery(input);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={input} 
          onChange={handleChange} 
          placeholder="Search for a product"
        />
        <button type="submit">Search</button>
      </form>

      {/* <ProductsListing /> */}

    </div>
    );
  };

export default Search;
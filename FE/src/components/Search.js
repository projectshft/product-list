// src/components/Search.js

import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query); // Trigger the search with the current query
  };

  return (
    <div className="input-group">
      <div className="form-outline" data-mdb-input-init>
        <input
          type="search"
          id="form1"
          className="form-control"
          value={query}
          onChange={handleChange}
        />
       
      </div>
      <button
        type="button"
        onClick={handleSearch}
        className="search-button"> Search</button>
      
    </div>
  );
};

export default Search;

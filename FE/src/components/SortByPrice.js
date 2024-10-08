import React, { useState } from 'react';
import '../assets/styles/sortByPrice.css';
// In your App.js or index.js file
import '../assets/styles/global.css'; // Adjust the path as necessary

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS

function Sort({ onSort }) {
  const [selectedOption, setSelectedOption] = useState('asc');

  const handleSortChange = (option) => {
    setSelectedOption(option);
    onSort(option);
  };

  return (
    <div className="sort">
      
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {selectedOption === 'asc' ? 'Price: Low to High' : 'Price: High to Low'}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button
            className="dropdown-item"
            onClick={() => handleSortChange('asc')}
          >
            Price: Low to High
          </button>
          <button
            className="dropdown-item"
            onClick={() => handleSortChange('desc')}
          >
            Price: High to Low
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sort;

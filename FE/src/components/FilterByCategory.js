import React, { useState } from 'react';
import '../assets/styles/FilterByCategory.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
// In your App.js or index.js file
import '../assets/styles/global.css'; // Adjust the path as necessary


function FilterByCategory({ onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category); // Notify the parent component about the category change
  };

  return (
    <div className="filter-by-category">
      
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="categoryDropdownButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {selectedCategory === 'all' ? 'Select Category' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
        </button>
        <div className="dropdown-menu" aria-labelledby="categoryDropdownButton">
          <button className="dropdown-item" onClick={() => handleCategoryChange('all')}>All</button>
          <button className="dropdown-item" onClick={() => handleCategoryChange('beauty')}>Beauty</button>
          <button className="dropdown-item" onClick={() => handleCategoryChange('jewelry')}>Jewelry</button>
          <button className="dropdown-item" onClick={() => handleCategoryChange('garden')}>Garden</button>
          <button className="dropdown-item" onClick={() => handleCategoryChange('games')}>Games</button>
          <button className="dropdown-item" onClick={() => handleCategoryChange('home')}>Home</button>
        </div>
      </div>
    </div>
  );
}

export default FilterByCategory;

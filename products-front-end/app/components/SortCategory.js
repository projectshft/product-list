import React from "react";

/**
 * Creates a dropdown menu to sort products by category
 */
const SortCategory = ({ onSortCategoryChange }) => {
  return (
    <div className="sort-dropdown">
      <label></label>
      <select onChange={(e) => onSortCategoryChange(e.target.value)}>
        <option value="" disabled selected>Sort by Category</option>
        <option value="">All</option>
        <option value="movies">Movies</option>
        <option value="beauty">Beauty</option>
        <option value="toys">Toys</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="health">Health</option>
        <option value="clothing">Clothing</option>
        <option value="games">Games</option>
        <option value="computers">Computers</option>
        <option value="garden">Garden</option>
        <option value="sports">Sports</option>
        <option value="tools">Tools</option>
        <option value="baby">Baby</option>
        <option value="shoes">Shoes</option>
        <option value="home">Home</option>
        <option value="books">Books</option>
        <option value="grocery">Grocery</option>
        <option value="music">Music</option>
        <option value="industrial">Industrial</option>
        <option value="kids">Kids</option>
        <option value="automotive">Automotive</option>
      </select>
    </div>
  );
};

export default SortCategory;
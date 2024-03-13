import React from "react";

/**
 * Creates a dropdown menu to sort by highest or lowest price
 */
const SortPrice = ({ onSortPriceChange }) => {
  return (
    <div className="sort-dropdown">
      <label></label>
      <select onChange={(e) => onSortPriceChange(e.target.value)}>
        <option value="" disabled selected>Sort by Price</option>
        <option value="">None</option>
        <option value="highest">Highest Price</option>
        <option value="lowest">Lowest Price</option>
      </select>
    </div>
  );
};

export default SortPrice;
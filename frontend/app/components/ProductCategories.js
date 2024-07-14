'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../store/slices/products';

/**
 * A component to render a dropdown to filter by category
 * @returns Functional React Component
 */
export function ProductCategories() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  // function handleSearchChange(value) {
  //   setSearchValue(value);
  // }

  return (
    <div className="col col-3">
      <div className="d-flex justify-content-center pb-4 pt-4">
        <select className="form-select">
          <option selected>Filter by Category</option>
          <option>Toys</option>
          <option>Electronics</option>
          <option>Grocery</option>
        </select>
      </div>
    </div>
  );
}

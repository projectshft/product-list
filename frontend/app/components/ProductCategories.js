'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  categorySelected,
  fetchCategories,
  fetchProducts,
  pageSelected,
} from '../store/slices/products';

/**
 * A component to render a dropdown to filter by category
 * @returns Functional React Component
 */
export function ProductCategories() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const categories = useSelector((state) => state.products.categories);

  function handleCategoryChange(value) {
    setCategory(value);
  }

  // Fetch categories on initial render
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);

  // Fetch products filtered by category
  useEffect(() => {
    dispatch(pageSelected('1'));
    dispatch(categorySelected(category));
    dispatch(fetchProducts());
  }, [category, dispatch]);

  return (
    <div className="col col-3">
      <div className="d-flex justify-content-center pb-4 pt-4">
        <select
          className="form-select"
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">Filter by Category</option>
          {categories.map((cat, i) => (
            <option key={i}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

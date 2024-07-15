'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/slices/products';

/**
 * A component to render a search/input
 * @returns Functional React Component
 */
export function ProductSearch() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const category = useSelector((state) => state.products.category);

  function handleSearchChange(value) {
    setSearch(value);
  }

  // Debounce the the search value to prevent a query for each keystroke
  useEffect(() => {
    const sendSearch = setTimeout(() => {
      dispatch(fetchProducts({ search, category }));
    }, 1000);

    return () => clearTimeout(sendSearch);
  }, [search, category, dispatch]);

  return (
    <div className="col col-6">
      <div className="d-flex justify-content-center pb-4 pt-4">
        <input
          className="form-control"
          value={search}
          placeholder="Search Products"
          onChange={(e) => {
            handleSearchChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

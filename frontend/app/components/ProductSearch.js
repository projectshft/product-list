'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../store/slices/products';

/**
 * A component to render a search/input
 * @returns Functional React Component
 */
export function ProductSearch() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  function handleSearchChange(value) {
    setSearch(value);
  }

  // Debounce the the search value to prevent a query for each keystroke
  useEffect(() => {
    const sendSearch = setTimeout(() => {
      dispatch(fetchProducts({ search }));
    }, 1000);

    return () => clearTimeout(sendSearch);
  }, [search, dispatch]);

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

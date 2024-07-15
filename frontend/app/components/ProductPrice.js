'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { priceSelected, fetchProducts } from '../store/slices/products';

/**
 * A component to render a selection component to sort products by price
 * @returns Functional React Component
 */
export function ProductPrice() {
  const dispatch = useDispatch();
  const [price, setPrice] = useState('');

  function handlePriceChange(value) {
    setPrice(value);
  }

  // Update state if price is selected
  useEffect(() => {
    dispatch(priceSelected(price));
    dispatch(fetchProducts());
  }, [price, dispatch]);

  return (
    <div className="col col-3">
      <div className="d-flex justify-content-center pb-4 pt-4">
        <select
          className="form-select"
          value={price}
          onChange={(e) => handlePriceChange(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
    </div>
  );
}

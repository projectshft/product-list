'use client';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/products';

/**
 * A component to render a single item in the page nav
 * @returns Functional React Component
 */

export function ProductPageNavItem({ page }) {
  const dispatch = useDispatch();

  function handleClick(pageNum) {
    // Call dispatch to fetchProducts
    dispatch(fetchProducts(pageNum));
  }

  return (
    <li className="page-item">
      <a
        className="page-link"
        href="#"
        onClick={(event) => handleClick(event.target.innerHTML)}
      >
        {page}
      </a>
    </li>
  );
}

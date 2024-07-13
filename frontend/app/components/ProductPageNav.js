'use client';

import { useSelector } from 'react-redux';
import { ProductPageNavItem } from './ProductPageNavItem';

/**
 * A component to render the entire page nav
 * @returns Functional React Component
 */

export function ProductPageNav() {
  const totalPages = useSelector((state) => state.products.totalPages);

  // Create an array of page numbers based on the totalPages returned by Mongo
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1, // Starts from 1
  );

  return (
    <div className="d-flex justify-content-center">
      <nav aria-label="products pages">
        <ul className="pagination">
          <ProductPageNavItem page="Previous" />
          {pageNumbers.map((page, index) => (
            <ProductPageNavItem key={index} page={page} />
          ))}
          <ProductPageNavItem page="Next" />
        </ul>
      </nav>
    </div>
  );
}

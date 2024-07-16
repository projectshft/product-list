'use client';

import { useDispatch, useSelector } from 'react-redux';
import { pageSelected, fetchProducts } from '../store/slices/products';
import { ProductPageNavItem } from './ProductPageNavItem';
import { ProductPreviousPage } from './ProductPreviousPage';
import { ProductNextPage } from './ProductNextPage';

/**
 * A component to render the entire page nav
 * @returns Functional React Component
 */
export function ProductPageNav() {
  const dispatch = useDispatch();
  const totalPages = useSelector((state) => state.products.totalPages);
  const currentPage = useSelector((state) => Number(state.products.activePage));

  // Create an array of page numbers based on the totalPages returned by Mongo
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1, // Starts from 1
  );

  function handleClick(page) {
    // Call dispatch to update currentPage in state
    dispatch(pageSelected(page));

    // Call dispatch to fetchProducts
    dispatch(fetchProducts());
  }

  return (
    <div className="d-flex justify-content-center p-4">
      <nav aria-label="products pages">
        <ul className="pagination">
          <ProductPreviousPage
            previousPage={currentPage - 1}
            onClick={handleClick}
          />
          {pageNumbers.map((page, index) => (
            <ProductPageNavItem
              key={index}
              page={page}
              isActive={currentPage === page}
              onClick={handleClick}
            />
          ))}
          <ProductNextPage
            nextPage={currentPage + 1}
            totalPages={totalPages}
            onClick={handleClick}
          />
        </ul>
      </nav>
    </div>
  );
}

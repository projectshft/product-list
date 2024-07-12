'use client';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/products';

export function ProductPageNav() {
  const dispatch = useDispatch();
  const totalPages = useSelector((state) => state.products.totalPages);

  // Create an array of page numbers
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  function handleClick(pageNum) {
    // Call dispatch to fetchProducts
    dispatch(fetchProducts(pageNum));
  }

  return (
    <div className="d-flex justify-content-center">
      <nav aria-label="products pages">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              onClick={(event) => handleClick(event.target.innerHTML)}
            >
              Previous
            </a>
          </li>
          {pageNumbers.map((page) => (
            <li key={page} className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={(event) => handleClick(event.target.innerHTML)}
              >
                {page}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              onClick={(event) => handleClick(event.target.innerHTML)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

'use client';

/* eslint-disable react/prop-types */

/**
 * A component to access the previous page in the page nav
 * @returns Functional React Component
 */
export function ProductPreviousPage({ previousPage, onClick }) {
  // Disables click if on the first page
  const classValues = previousPage <= 0 ? 'page-item disabled' : 'page-item';

  return (
    <li className={classValues}>
      <button
        type="button"
        className="page-link"
        onClick={() => onClick(previousPage)}
      >
        Previous
      </button>
    </li>
  );
}

'use client';

/* eslint-disable react/prop-types */

/**
 * A component to access the next page in the page nav
 * @returns Functional React Component
 */
export function ProductNextPage({ nextPage, totalPages, onClick }) {
  // Disables click if on the last page
  const classValues =
    nextPage > totalPages ? 'page-item disabled' : 'page-item';

  return (
    <li className={classValues}>
      <button
        type="button"
        className="page-link"
        onClick={() => onClick(nextPage)}
      >
        Next
      </button>
    </li>
  );
}

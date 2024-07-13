'use client';

/* eslint-disable react/prop-types */

/**
 * A component to render a single item in the page nav
 * @returns Functional React Component
 */
export function ProductPageNavItem({ page, isActive = false, onClick }) {
  // Highlights active page in the nav
  const classValues = isActive ? 'page-item active' : 'page-item';

  // Disables click on the active page
  if (isActive) {
    return (
      <li className={classValues}>
        <span className="page-link">{page}</span>
      </li>
    );
  }

  return (
    <li className={classValues}>
      <button type="button" className="page-link" onClick={() => onClick(page)}>
        {page}
      </button>
    </li>
  );
}

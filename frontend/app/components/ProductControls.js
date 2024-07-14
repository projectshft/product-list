'use client';

import { ProductSearch } from './ProductSearch';

/**
 * A component to render child components that search, filter, and sort products
 * @returns Functional React Component
 */
export function ProductControls() {
  return (
    <div className="container">
      <div className="row">
        <ProductSearch />
      </div>
    </div>
  );
}

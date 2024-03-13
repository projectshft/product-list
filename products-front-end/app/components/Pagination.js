import React from 'react';

/**
 * Pagination functionality that renders page buttons based on the amount of products in the search
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPaginationLinks = () => {
    /**
     * Empty array to render page links
     */
    const links = [];

    for (let page = 1; page <= totalPages; page++) {
      /**
       * Determines CSS class for adding color to the active page button
       */
      let buttonClassName = '';
      if (currentPage === page) {
        buttonClassName = 'active';
      }

      /**
       * Creates a button with an onClick handler to change the page
       */
      links.push(
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={buttonClassName}
        >
          {page}
        </button>
      );
    }
    return links;
  };

  /**
   * Renders the Pagination component with page buttons
   */
  return (
    <div className="pagination justify-content-center">
      {renderPaginationLinks()}
    </div>
  );
};

export default Pagination;
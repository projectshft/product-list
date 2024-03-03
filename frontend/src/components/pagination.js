import React from "react";

const PaginationComponent = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {

  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (

    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a onClick={() => currentPage > 1 && onPageChange(currentPage - 1)} href="#" className="page-link">Previous</a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <a onClick={() => onPageChange(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)} href="#" className="page-link">Next</a>
        </li>
      </ul>
    </nav>
  )

};

export default PaginationComponent;
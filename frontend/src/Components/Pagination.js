import React from 'react';
import '../CSS/pagination.css';

const Pagination = ({ numberOfPages, currentPage, fetchProducts, currentCategory, currentSort }) => {
  const handleClick = (event, goToPage) => {
    event.preventDefault();
    fetchProducts({ 
      page: goToPage,
      category: (currentCategory) ? currentCategory.categoryFilter : '',
      price: (currentSort) ? currentSort.sortOptions : ''
    });
  }

  const previousButton = (currentPage === 1) ?
    <li className='page-item disabled'>
      <a className='page-link' href='#'>
        Previous
      </a>
    </li> :
    <li className='page-item'>
      <a className='page-link' href='#' onClick={e => handleClick(e, (currentPage-1))}>
        Previous
      </a>
    </li>;

  const nextButton = (currentPage === numberOfPages) ?
  <li className='page-item disabled'>
    <a className='page-link' href='#'>
      Next
    </a>
  </li> :
  <li className='page-item'>
    <a className='page-link' href='#' onClick={e => handleClick(e, (currentPage+1))}>
      Next
    </a>
  </li>;

  //put pageButtons into array for jsx
  const pageButtons = [];
  for(let i=0; i<numberOfPages; i++) {
    if (currentPage === i+1) {
      pageButtons.push(
        <li className='page-item active' key={i+1}>
          <a className='page-link' href='#' onClick={e => handleClick(e, (i+1))}>
            {i+1}
          </a>
        </li>
      );
    } else {
      pageButtons.push(
        <li className='page-item' key={i+1}>
          <a className='page-link' href='#' onClick={e => handleClick(e, (i+1))}>
            {i+1}
          </a>
        </li>
      );
    }
  }

  return (
    <nav aria-label='Page navigation' className='mt-3'>
      <ul className='pagination justify-content-center'>
        {previousButton}
        {pageButtons}
        {nextButton}
      </ul>
    </nav>
  );
};

export default Pagination;
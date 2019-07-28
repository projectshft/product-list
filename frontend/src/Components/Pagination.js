import React from 'react';

const Pagination = ({ numberOfPages, currentPage, fetchProducts }) => {
  const handleClick = (event, goToPage) => {
    event.preventDefault();
    fetchProducts({ page: goToPage });
  }

  const previousButton = (currentPage == 1) ?
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

  const nextButton = (currentPage == numberOfPages) ?
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
    pageButtons.push(
      <li className='page-item'>
        <a className='page-link' href='#' onClick={e => handleClick(e, (i+1))}>
          {i+1}
        </a>
      </li>
    );
  }

  return (
    <nav aria-label='Page navigation'>
      <ul className='pagination justify-content-center'>
        {previousButton}
        {pageButtons}
        {nextButton}
      </ul>
    </nav>
  );
};

export default Pagination;
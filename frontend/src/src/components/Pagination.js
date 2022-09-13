import React from 'react';
import { fetchPage, priceFilter, combo } from '../action';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
export const UserContext = React.createContext();

const Pagination = () => {
  let nPages = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const dispatch = useDispatch();
  const displayPage = (pgNumber) => {
    pgNumber = pgNumber.toString();
    setCurrentPage(pgNumber);
    dispatch(combo(pgNumber));
  };

  // const displayPagePrev = () => {
  //   if (currentPage !== 1) {
  //     setCurrentPage(currentPage - 1);
  //     displayPage(currentPage);
  //   }
  // };

  // const displayPageNext = () => {
  //   if (currentPage !== nPages) {
  //     setCurrentPage(currentPage + 1);
  //     displayPage(currentPage);
  //   }
  // };

  return (
    <nav>
      <h6 style={{ textAlign: 'center' }}>You are on page: {currentPage}</h6>
      <ul className='pagination justify-content-center'>
        <li className='page-item'>
          {/* <a className='page-link' onClick={() => displayPagePrev()} href='#'>
            Previous
          </a> */}
        </li>
        {pageNumbers.map((pgNumber) => (
          <li key={pgNumber}>
            <a
              // onClick={() => setCurrentPage(pgNumber)}
              onClick={() => displayPage(pgNumber)}
              className='page-link'
              href='#'
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li className='page-item'>
          {/* <a className='page-link' onClick={() => displayPageNext()} href='#'>
            Next
          </a> */}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

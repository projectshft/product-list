import React from 'react'
import { useState } from 'react'
import './Paginate.css';
import { getProducts } from '../redux/actions';

const Paginate = () => {
  // const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  // Handle Page Pagination
  const handlePrevious = () => {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    })
  } 
  
  const handleNext = () => {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    })
  }

  return (
    <div>
      <footer>
        <button disabled={page === 1} onClick={handlePrevious}>Previous</button>
        <button disabled={page === pageCount} onClick={handleNext}>Next</button>
      </footer>

      </div>
    )
  } 

export default Paginate
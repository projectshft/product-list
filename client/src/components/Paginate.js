import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { searchProduct, updateCategory, setPage } from '../redux/actions';
import './Paginate.css';

const Paginate = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [category, setCategory] = useState(''); 

  const totalCount = useSelector(state => state.count);
  const dispatch = useDispatch();

  // Handle Page Pagination
  const handlePreviousPage = () => {
    dispatch(searchProduct);
    dispatch(setPage(currentPage - 1))
    console.log('View previous page');
    }
  
  const handleNextPage = () => {
    console.log('View next page')
    dispatch(setPage(currentPage + 1))
    dispatch(updateCategory(category));
  }

  return (
    <div>
      <footer>
        <button disabled={currentPage === 1} onClick={handlePreviousPage}>Previous</button>
        <button disabled={currentPage === pageCount} onClick={handleNextPage}>Next</button>
      </footer>

      </div>
    )
  } 

export default Paginate
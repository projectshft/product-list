import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchProducts } from '../actions/index';  


const Pagination = (props) => {
  const dispatch = useDispatch();

  let count = useSelector((state) => state.count.count);

  console.log(count);
  const pageNumbers = [];


  const [currentPage, setCurrentPage] = useState(1);
  const paginate = pageNumber => setCurrentPage(pageNumber);


  
  let params = useSelector((state) => state.query);
  console.log(params)


  
  let pageCount = 0;
  if(count>0 && count !==undefined) {
    pageCount =  Math.ceil(count/9);
  }
  

  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  const nextPage = (e) => {
  if(currentPage !== pageNumbers.length-1) {
  setCurrentPage(currentPage+1);
  dispatch(fetchProducts(params.category, params.price, params.query, currentPage))
  }
  return;

  }

  const previousPage = (e) => {
  if(currentPage===1) return;

  else {
    setCurrentPage(currentPage-1)
    dispatch(fetchProducts(params.category, params.price, params.query, currentPage))
  };
  }

  //Below I restrict the page numbers only up to 10 or else just the previous/next is shown
    return (
  <nav className="page-navigation">
      <button onClick={previousPage} disabled={currentPage === 1} className="page-link" aria-label="Previous">
        <span aria-hidden="true"> &laquo; Previous</span>
      </button>
      {pageNumbers?.length<10 && pageNumbers?.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      <button onClick={nextPage} disabled={currentPage === pageCount} className="page-link" aria-label="Next">
        <span aria-hidden="true">Next &raquo;</span>
      </button>
  </nav>
  )
};
  
  

export default Pagination;


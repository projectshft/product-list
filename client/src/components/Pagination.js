import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchProducts } from '../actions/index';  


const Pagination = (props) => {
  const dispatch = useDispatch();

  let count = useSelector((state) => state.count.count);

  const pageNumbers = [];

  const [currentPage, setCurrentPage] = useState(1);
  
   
  let params = useSelector((state) => state.query);
  let price = params.price;
  let category=params.category;
  let query=params.query;


  let pageCount = 0;
  if(count) {
    pageCount =  Math.ceil(count/9);
  }
  

  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    dispatch(fetchProducts(category, price, query, currentPage))
  }, [dispatch, category, price, query, currentPage] )

  const nextPage = (e) => {
  setCurrentPage(Number(currentPage) + 1)
};


  const previousPage = (e) => {
  if(currentPage===1) return;
  else {
    setCurrentPage(Number(currentPage) - 1)
  };
 
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
 
  }

  //Below I restrict the page numbers only up to 10 or else just the previous/next is shown
    return (
  <nav className="page-navigation">
      <button onClick={previousPage} disabled={currentPage === 1} className="page-link" aria-label="Previous">
        <span aria-hidden="true"> &laquo; Previous</span>
      </button>
      {pageNumbers?.length<10 && pageNumbers?.map(number => (
          <li key={number} className='page-item'>
            {/* // eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={() => paginate(number)} href="/" className='page-link'>
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


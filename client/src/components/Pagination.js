import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchProducts } from '../actions/index';  


const Pagination = (props) => {
  const dispatch = useDispatch();

  let count = useSelector((state) => state.count.count);

  console.log(count);
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

  //NEED TO ADDRESS ISSUE WHERE FIRST PAGE INFO GETS SWITCHED - need to pass in current page to the fetch instead of '1' default!!
  const nextPage = (e) => {
  let newPage = Number(currentPage) + 1;
  setCurrentPage(newPage)
  setCurrentPage(currentPage+1);
  dispatch(fetchProducts(category, price, query, currentPage))
  }


  const previousPage = (e) => {
  if(currentPage===1) return;
  else {
    let newPage = Number(currentPage) - 1;
    console.log('prev page', newPage)
    setCurrentPage(newPage)
    dispatch(fetchProducts(category, price, query, currentPage))
  };
  }

  const paginate = (pageNumber) => {
    // console.log('clicked',pageNumber)
    if(pageNumber !== currentPage) {
    setCurrentPage(pageNumber);
    dispatch(fetchProducts(category, price, query, currentPage))
  }
}

  //Below I restrict the page numbers only up to 10 or else just the previous/next is shown
    return (
  <nav className="page-navigation">
      <button onClick={previousPage} disabled={currentPage === 1} className="page-link" aria-label="Previous">
        <span aria-hidden="true"> &laquo; Previous</span>
      </button>
      {pageNumbers?.length<10 && pageNumbers?.map(number => (
          <li key={number} className='page-item'>
            <button onClick={() => paginate(number)} type="submit" className='page-link'>
              {number}
            </button>
          </li>
        ))}
      <button onClick={nextPage} disabled={currentPage === pageCount} className="page-link" aria-label="Next">
        <span aria-hidden="true">Next &raquo;</span>
      </button>
  </nav>
  )
};
  
  

export default Pagination;


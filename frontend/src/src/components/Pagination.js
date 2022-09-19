import { fetchProducts } from '../action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import '../App.css';

const Pagination = ({
  currentPage,
  setCurrentPage,
  price,
  category,
  query,
}) => {
  // since we only use faker-js once (90 product) and each page displays 9,
  // therefore the number of pages is 10
  let nPages = 10;

  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const dispatch = useDispatch();
  const displayPage = (pgNumber) => {
    dispatch(fetchProducts(pgNumber, price, category, query));
  };

  const displayPagePrev = () => {
    if (currentPage !== 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const displayPageNext = () => {
    if (currentPage !== nPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    displayPage(currentPage);
  }, [currentPage]);

  return (
    <nav>
      <h6>You are on page: {currentPage}</h6>
      <ul className='pagination justify-content-center'>
        <li>
          <button className='page-link' onClick={() => displayPagePrev()}>
            Previous
          </button>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li key={pgNumber}>
            <a
              onClick={() => setCurrentPage(pgNumber)}
              className='page-link'
              href='#'
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li>
          <button className='page-link' onClick={() => displayPageNext()}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

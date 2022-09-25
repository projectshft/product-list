import { fetchProducts } from '../action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import '../App.css';

const Pagination = ({
  currentPage,
  setCurrentPage,
  price,
  category,
  query,
}) => {
  // set productCount a default value in order to kick off the app when it gets loaded the first time
  const productCount = useSelector((state) => state.products.count) || 10;
  let nPages = Math.ceil(parseInt(productCount) / 9);

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

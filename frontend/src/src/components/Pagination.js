import { combo } from '../action';
import { useDispatch } from 'react-redux';

const Pagination = ({
  currentPage,
  setCurrentPage,
  price,
  category,
  query,
}) => {
  let nPages = 10;
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const dispatch = useDispatch();
  const displayPage = (pgNumber) => {
    setCurrentPage(pgNumber);
    dispatch(combo(pgNumber, price, category, query));
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

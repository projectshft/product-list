import { getProducts } from '../actions';
import { useDispatch } from 'react-redux';

const Pagination = (props) => {
  const dispatch = useDispatch();
  let options = {};

  // determine num pages based on count of items returned matching query params
  const numPages = Math.ceil(props.productCount / 9);

  // update state with new fetch for next page of results
  const handlePageClick = (i) => {
    options.page = `page=${i}`;
    dispatch(getProducts(options));
  };

  // generate pagination buttons
  const renderPagination = () => {
    let pages = [];
    for (let i = 1; i <= numPages; i++) { 
      pages.push(
        <li className="page-item" key={i}>
        <button className="page-link" onClick={() => handlePageClick(i)}>{i}</button>
      </li>
      );
    };
    return pages;
  };

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col">
            <ul className="pagination pagination-lg justify-content-center">
              {renderPagination()}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

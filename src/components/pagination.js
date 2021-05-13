import { getProducts } from '../actions';
import { useDispatch } from 'react-redux';


const Pagination = (props) => {
  const dispatch = useDispatch();

  const numPages = Math.ceil(props.productCount / 9);

  const handlePageClick = (i) => {
    const options = `page=${i}`
    dispatch(getProducts(options));
  }

  const renderPagination = () => {
    let pages = []
    for (let i = 1; i <= numPages; i++) {
      pages.push(
        <li className="page-item" key={i}>
        <button className="page-link" onClick={() => handlePageClick(i)}>{i}</button>
      </li>
      )
    }
    return pages;
  }

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col">
            <ul className="pagination pagination-lg justify-content-end">
              {renderPagination()}
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Pagination

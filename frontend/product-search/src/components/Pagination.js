import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPage } from '../actions';

const Pagination = () => {
  const numProducts = useSelector((state) => state.products.numProducts);
  const numPages = Math.ceil(numProducts/9);
  const pages = [...Array(numPages).keys()];

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setPage(e.target.text));
  };

  return (
    <div className='container pages'>
      <div className='row'>
        <ul className='pagination'>
          {( pages.map((p, index) => (
              <li className='page-item' key={index}><a className="page-link" href="#" onClick={(e) => handleClick(e)}>{p + 1}</a></li>
          )))}
        </ul>
      </div>
    </div>
  )
};

export default Pagination;
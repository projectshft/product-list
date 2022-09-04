import { useDispatch } from "react-redux";
import { addProducts } from '../actions';

const Page = ({ state, page }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProducts({ ...state, page: page }));
  };
  
  return (
    <li className="page-item">
      <button onClick={handleClick} className="page-link">{page}</button>
    </li>
  )
};

const Pagination = ({ state, pageCount }) => {
  const pageNumbers = new Array(pageCount).fill(0).map((page, i) => {
    return <Page key={i} state={state} page={page + i + 1} />
  });

  return (
    <ul className="pagination d-flex justify-content-center mt-4">
      {pageNumbers}
    </ul>
  )
};

export default Pagination;
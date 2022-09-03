import { useDispatch } from "react-redux";
import { addProducts } from '../actions';


const Page = ({ state, page }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(addProducts({ ...state, page: page }));
  }
  
  return <button onClick={handleClick} className="btn p-1 mx-1 text-primary">{page}</button>
}

const Pagination = ({ state, pageCount }) => {
  const pageNumbers = new Array(pageCount).fill(0).map((page, i) => {
    return <Page key={i} state={state} page={page + i + 1} />
  });

  return (
    <div className="row row-cols-auto d-flex justify-content-center">
      <p>Page {pageNumbers}</p>
    </div>
  )
};

export default Pagination;
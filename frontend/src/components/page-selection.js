import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../actions/actions";

const PageSelection = () => {
  const count = useSelector(state => state.count);
  const queryParams = useSelector(state => state.queryParams);
  const dispatch = useDispatch();

  let pageArray = [];

  if (count > 9) {

    let pageNum = 1;
    for (let i = 0; i < count; i += 9) {
      pageArray.push(pageNum);
      pageNum++;
    }
  }

  const handlePageClick = (e) => {
    const query = queryParams.query || '';
    const category = queryParams.category || '';
    const price = queryParams.price || '';

    dispatch(getProducts(`?query=${query}&category=${category}&price=${price}&page=${e.target.value}`))
  }

  const renderPageNums = () => {
    return pageArray.map(page => {
      return <button className="col-md-1" key={page} value={page} onClick={handlePageClick}>{page}</button>
    })
  }

  return (
    <div className="row">
      {renderPageNums()}
    </div>
  )
}

export default PageSelection;
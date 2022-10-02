import { useSelector } from "react-redux";
import { fetchProducts } from "../actions";
import { useDispatch } from "react-redux";

const PaginateRender = () => {
  const paginateState = useSelector((state) => state.product.prevSearch);
  const oldSearch = useSelector((state) => state.product.data);
  const dispatch = useDispatch();

  function handlePage(e) {
    e.preventDefault();
    dispatch(fetchProducts({ ...oldSearch, page: e.target.value }));
  }
  if (paginateState) {
    let pageTotal = [];
    let n = 1;
    while (pageTotal.length < paginateState.totalPages) {
      pageTotal.push(n);
      n++;
    }
    let pages = pageTotal.map((element) => {
      return (
        <li className="page-item" key={element}>
          <button
            className="page-link"
            value={element}
            onClick={(e) => handlePage(e)}
          >
            {element}
          </button>
        </li>
      );
    });
    return (
      <>
        <nav aria-label="Page navigation example">
          <ul className="pagination">{pages}</ul>
        </nav>
      </>
    );
  }
};

export default PaginateRender;

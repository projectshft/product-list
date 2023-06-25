import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../actions";

// NOT USED. Ended up putting this code within searchbar.js so that page state was not separate from query, category, and price.
const Pagination = () => {
  const [page, setPage] = useState("");

  const count = useSelector((state) => state.count);
  const perPage = 9;
  const pagesNeeded = Math.ceil(count / perPage);
  const pagesArr = [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [page]);

  for (let i = 1; i < pagesNeeded + 1; i++) {
    pagesArr.push(i);
  };

  const handlePageClick = e => {
    setPage(e.currentTarget.innerText);
  };

  const renderPagination = () => {
    return pagesArr.map((num, i) => {

      return (
        <li className="page-item" key={i}><button className="page-link" onClick={handlePageClick}>{num}</button></li>
      );
    });
  };


  return (
    <nav aria-label="Search results pages">
      <ul className="pagination">
        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
        {renderPagination()}
        <li className="page-item"><a className="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  )
};

export default Pagination;

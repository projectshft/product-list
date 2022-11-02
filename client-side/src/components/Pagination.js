/* eslint-disable jsx-a11y/anchor-is-valid */
import { fetchProducts } from "../actions/fetchProducts";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "../App.css";

const Pagination = ({
  currentPage,
  setCurrentPage,
  price,
  category,
  query,
}) => {
  const defaultCount = useSelector((state) => state.products.count || 90);
  let pageCount = Math.ceil(parseInt(defaultCount) / 9);
  const pageNumbers = [...Array(pageCount + 1).keys()].slice(1);
  const dispatch = useDispatch();
  const renderPage = (pageNumber) => {
    dispatch(fetchProducts(pageNumber, price, category, query));
  };
  const showPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((previousPage) => previousPage - 1);
    }
  };
  const showNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage((previousPage) => previousPage + 1);
    }
  };
  useEffect(() => {
    renderPage(currentPage);
  }, [currentPage]);

  return (
    <nav>
      <p>
        Search Results, Page {currentPage} of {pageCount}
      </p>
      <ul className="pagination">
        <li>
          <button className="button-link" onClick={() => showPreviousPage()}>
            &#8592; Previous
          </button>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <a
              onClick={() => setCurrentPage(pageNumber)}
              className="link"
              //used this hash to move the scroll position to the top of the page
              href="#"
            >
              {pageNumber}
            </a>
          </li>
        ))}
        <li>
          <button className="button-link" onClick={() => showNextPage()}>
            Next &#8594;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

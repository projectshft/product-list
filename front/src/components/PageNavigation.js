import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPageQuery } from "../actions";

export default function PageNavigation() {
  const numOfProducts = useSelector((state) => state.productCount);
  const numOfPages = Math.ceil(numOfProducts / 9);
  const pageLinks = [];
  const currentPage = useSelector((state) => state.page);

  const dispatch = useDispatch();

  const handleClick = (page) => {
    dispatch(setPageQuery(page));
  };

  for (let i = 1; i <= numOfPages; i++) {
    let liClassName = "page-item";
    if (i === currentPage) {
      liClassName += " active";
    }

    pageLinks.push(
      <li key={i} onClick={() => handleClick(i)} className={liClassName}>
        <p className="page-link">{i}</p>
      </li>
    );
  }

  return (
    <div className="row">
      <nav aria-label="Page navigation">
        <ul className="pagination pagination-lg justify-content-center">
          {pageLinks.map((link) => link)}
        </ul>
      </nav>
    </div>
  );
}

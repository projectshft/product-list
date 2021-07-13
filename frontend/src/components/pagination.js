import React from "react";
import { useSelector } from "react-redux";

const Pagination = (props) => {
  const count = useSelector((state) => state.productData.count);

  let paginationPages = [];

  if (count !== undefined) {
    const productsPerPage = 9;
    const pages = Math.ceil(count / productsPerPage);

    for (let i = 0; i < pages; i++) {
      paginationPages.push(i + 1);
    }
  }

  if (count === undefined) {
    return <div></div>;
  }

  return paginationPages.map((page) => (
    <li className="page-item" key={page}>
      <button
        className="page-link"
        type="button"
        value={page}
        onClick={(e) => props.setPage(e.target.value)}
      >
        {page}
      </button>
    </li>
  ));
};

export default Pagination;

import React from "react";
import { useSelector } from "react-redux";

const Pagination = () => {
  const count = useSelector((state) => state.productData.count);

  console.log("count", count);

  if (count !== undefined) {
    const productsPerPage = 9;
    const pages = Math.ceil(count / productsPerPage);
    let paginationPages = [];

    for (let i = 0; i < pages; i++) {
      paginationPages.push(i + 1);
    }

    console.log(paginationPages);
  }

  if (count === undefined) {
    return <div></div>;
  }

  return <div className="pagination"></div>;
};

export default Pagination;

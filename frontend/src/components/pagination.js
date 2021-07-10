import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../actions";

const Pagination = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const count = useSelector((state) => state.productData.count);
  let paginationPages = [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(searchTerm, category, sort, page));
  }, [searchTerm, category, sort, page, dispatch]);

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
        onClick={(e) => setPage(e.target.value)}
      >
        {page}
      </button>
    </li>
  ));
};

export default Pagination;

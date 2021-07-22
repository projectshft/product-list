import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchCount, setPageQuery } from "../actions";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [priceSortMethod, setPriceSortMethod] = useState("");

  const numOfProducts = useSelector((state) => state.productCount);
  const categories = useSelector((state) => state.categories);
  const page = useSelector((state) => state.currentPage);

  const dispatch = useDispatch();

  //Make sure page isn't out of range
  if (page > Math.ceil(numOfProducts / 9)) {
    dispatch(setPageQuery(1));
  }

  let queryString = `?page=${page}`;

  if (searchTerm) {
    queryString += `&query=${searchTerm}`;
  }

  if (categoryQuery) {
    queryString += `&category=${categoryQuery}`;
  }

  if (priceSortMethod) {
    queryString += `&price=${priceSortMethod}`;
  }

  useEffect(() => {
    dispatch(fetchProducts(queryString));
    dispatch(fetchCount(queryString));
  }, [dispatch, queryString]);

  return (
    <div className="container header">
      <div className="row">
        <div className="column col-md-6">
          <input
            className="form-control"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearchTerm(() => e.target.value);
            }}
          />
        </div>
        <div className="column col-md-3">
          <select
            className="form-select"
            aria-label="Filter By Category"
            onChange={(e) => {
              setCategoryQuery(() => e.target.value);
            }}
          >
            <option value={""}>Filter By Category</option>
            {categories.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </div>
        <div className="column col-md-3">
          <select
            className="form-select"
            aria-label="Sort By Price"
            onChange={(e) => {
              setPriceSortMethod(() => e.target.value);
            }}
          >
            <option value={""}>Sort By Price</option>
            <option value={"lowest"}>Lowest to Highest</option>
            <option value={"highest"}>Highest to Lowest</option>
          </select>
        </div>
      </div>
    </div>
  );
}

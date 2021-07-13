import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchProducts } from "./actions";
import { useDispatch } from "react-redux";
import ProductData from "./components/productData";
import Pagination from "./components/pagination";
import Categories from "./components/categories";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const categories = useSelector((state) => state.productData.categories);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(searchTerm, category, sort, page));
  }, [searchTerm, category, sort, page, dispatch]);

  const handleProductSearch = (e) => {
    e.preventDefault();
    dispatch(fetchProducts(searchTerm, category, sort, page));
  };

  return (
    <div className="App">
      <h1 className="text-muted display-1 header">Anazon</h1>
      <div className="customerInput">
        <form onSubmit={(e) => handleProductSearch(e)}>
          <div className="searchBar">
            <input
              className="form-control input-bar"
              placeholder="Enter search term"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            ></input>
            <button className="btn btn-primary col-auto" type="submit">
              Submit
            </button>
          </div>
        </form>

        <div className="category">
          <select
            className="form-control"
            defaultValue={category}
            name="category"
            id="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option defaultValue="defaultValue" value="" key="default">
              All Categories ▼
            </option>
            <Categories categories={categories} />
          </select>
        </div>
        <div className="sort">
          <select
            className="form-control"
            name="sort"
            id="sort"
            placeholder="Sort by Price"
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <option defaultValue="defaultValue">Sort by ▼</option>
            <option value="highest">Highest</option>
            <option value="lowest">Lowest</option>
          </select>
        </div>
      </div>
      <div className="products">
        <ProductData />
      </div>
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <Pagination
              searchTerm={searchTerm}
              category={category}
              page={page}
              sort={sort}
              setPage={setPage}
            />
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default App;
